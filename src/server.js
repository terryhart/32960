import Whisper from "@36node/whisper";
import Protocol from "./protocol";

import { AUTH } from "./config";
import tcpcopy from "./tcpcopy";
import logger from "./logger";
import BufferQueue from "./BufferQueue";

const app = new Whisper();
const protocol = new Protocol();

function hexify(buf) {
  if (buf && buf instanceof Buffer) {
    return buf.toString("hex");
  }
  return buf;
}

/**
 * 平台登录的账号列表
 *
 * @param {string} auth 环境变量设置
 */
function getAccounts(auth = "") {
  const accounts = {};
  try {
    auth.split(",").forEach(s => {
      const pair = s.split(":");
      accounts[pair[0].trim()] = pair[1].trim();
    });
  } catch (err) {
    throw new Error("split AUTH env error");
  }
  return accounts;
}
const ACCOUNTS = getAccounts(AUTH);

const logHandler = async (ctx, next) => {
  try {
    const startedAt = Date.now();
    await next();
    const endAt = Date.now();
    logger.info(
      {
        session: ctx.session.id,
        seq: ctx.no,
        partial: !!ctx.state.partial,
        cost: endAt - startedAt,
        data: hexify(ctx.data),
        origin: ctx.state.partial ? hexify(ctx.state.origin) : undefined,
        request: ctx.req,
        response: hexify(ctx.res),
      },
      "handle tbox data success"
    );
  } catch (err) {
    logger.error(
      {
        session: ctx.session.id,
        seq: ctx.no,
        partial: !!ctx.state.partial,
        error: {
          type: err.constructor.name,
          message: err.message,
          stack: err.stack,
        },
        data: hexify(ctx.data),
      },
      "handle tbox data failed"
    );
  }
};

/**
 * 处理整个包，可能有粘帧
 */
const packetHandler = async (ctx, next) => {
  const { session, state } = ctx;
  const queue = (session.queue = session.queue || new BufferQueue());
  queue.push(ctx.data);
  state.partial = true;

  // 分包: 当前 header 长度不够
  if (!queue.has(protocol.HEADER_LENGTH)) return;

  // 非32960包
  const header = queue.first(protocol.HEADER_LENGTH);
  if (!protocol.isValidHeader(header)) {
    queue.empty();
    throw new Error("Invalid Header");
  }

  // 分包: 当前包长度不够
  const length = protocol.len(header);
  if (!queue.has(length)) return;

  // 进入包处理流程
  state.origin = ctx.data;
  ctx.data = queue.shift(length);
  state.partial = ctx.data !== state.origin; // 判断是否分包

  await next();

  // 把队列中多余的数据，作为一个新的data事件抛出
  if (queue.length > 0) {
    ctx.socket.emit("data", queue.drain());
  }
};

/**
 * 处理当前帧
 */
const frameHandler = (ctx, next) => {
  try {
    const req = (ctx.req = protocol.parse(ctx.data));

    // platform 登录
    if (req.command === "PLATFORM_LOGIN") {
      if (!req.body || !req.body.username) {
        throw new Error("no username provided for platform login request");
      }
      if (ACCOUNTS[req.body.username] !== req.body.password) {
        throw new Error(
          `platform username password not match: ${req.body.username}/${req.body.password}`
        );
      }
      ctx.session.username = req.body.username;
      ctx.session.platform = true;
      delete req.body.password;
    }

    // 平台的包一律应答
    if (ctx.session.platform || protocol.shouldRespond(ctx.req)) {
      ctx.res = protocol.respond(ctx.req, ctx.data);
    }
  } catch (err) {
    ctx.res = protocol.respondError(ctx.data);
    throw err;
  }

  return next();
};

app.use(tcpcopy);
app.use(logHandler);
app.use(packetHandler);
app.use(frameHandler);

app.on("close", session => {
  logger.info({ session: session.id }, "session closed");
});

app.on("timeout", session => {
  logger.warn({ session: session.id }, "session timeout");
});

export default app;
