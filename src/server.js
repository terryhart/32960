import Whisper from "@36node/whisper";
import Protocol from "./protocol";

import { AUTH } from "./config";
import tcpcopy from "./tcpcopy";
import logger from "./logger";

const app = new Whisper();
const protocol = new Protocol();

function hexify(buf) {
  if (buf instanceof Buffer) {
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
    console.error(err);
  }
  return accounts;
}
const ACCOUNTS = getAccounts(AUTH);

const logHandler = async (ctx, next) => {
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
    "handle rdb data"
  );
};

const errHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(
      {
        session: ctx.session.id,
        error: {
          type: err.constructor.name,
          message: err.message,
          stack: err.stack,
        },
      },
      "request error"
    );
  }
};

const packetHandler = (ctx, next) => {
  // 处理包中是否有粘帧，如果有多帧，解开
  const rest = protocol.deSticky(ctx.data);
  if (rest) {
    ctx.socket.emit("data", rest);
  }
  return next();
};

const frameHandler = (ctx, next) => {
  try {
    const req = (ctx.req = protocol.parse(ctx.data));
    if (req.command === "PLATFORM_LOGIN" && ACCOUNTS[req.body.username] !== req.body.password) {
      throw new Error("Platform username or password wrong.");
    }

    if (protocol.shouldRespond(ctx.data)) {
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
app.use(errHandler);
app.use(packetHandler);
app.use(frameHandler);

app.on("close", session => {
  logger.info({ session: session.id }, "session closed");
});

app.on("timeout", session => {
  logger.warn({ session: session.id }, "session timeout");
});

export default app;
