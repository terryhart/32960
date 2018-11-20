import Whisper from "@36node/whisper";
import Protocol from "./protocol";

import { AUTH } from "./config";
import tcpcopy from "./tcpcopy";
import logger from "./logger";
import BufferQueue from "./BufferQueue";
import { HEADER_LENGTH } from "./constants";

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
        cost: endAt - startedAt,
        origin: hexify(ctx.data),
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
        error: {
          type: err.constructor.name,
          message: err.message,
          stack: err.stack,
        },
        origin: hexify(ctx.data),
      },
      "handle tbox data failed"
    );
  }
};

/**
 * 处理整个包，可能有粘帧
 */
const packetHandler = async (ctx, next) => {
  if (!ctx.session.state.queue) {
    ctx.session.state.queue = new BufferQueue();
  }
  const queue = ctx.session.state.queue;
  queue.push(ctx.data);

  // 如果队列中剩余Buffer小于Header的长度，直接返回
  if (!queue.has(HEADER_LENGTH)) {
    return;
  }

  const length = protocol.len(queue.first(HEADER_LENGTH));

  // 如果队列中的Buffer小于整个Packet的长度，直接返回
  if (!queue.has(length)) {
    return;
  }

  // 从Queue中取出完整的数据包
  ctx.data = queue.shift(length);

  await next();

  // 把队列中多余的数据，作为一个新的data事件抛出
  ctx.socket.emit("data", queue.drain());
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
