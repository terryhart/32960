import net from "net";
import logger from "./logger";

import { DUP_HOST, DUP_PORT } from "./config";

const client = new net.Socket();

function connectToDup() {
  client.connect(
    DUP_PORT,
    DUP_HOST,
    function() {
      logger.info("connected to dup host");
    }
  );
}

client.on("close", function() {
  logger.info("connection closed and will reconnect after 5 minutes");
  setTimeout(connectToDup, 5 * 60 * 1000);
});

client.on("error", function(err) {
  logger.info("dup socket error");
  logger.error(err);
});

export default (ctx, next) => {
  client.write(ctx.data);
  return next();
};

connectToDup();
