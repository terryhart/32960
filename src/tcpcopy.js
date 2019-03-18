import net from "net";
import logger from "./logger";

export default (destHost, destPort) => {
  if (!destHost || !destPort) {
    throw new Error(`Invalid destination: ${destHost} ${destPort}`);
  }

  const client = new net.Socket();
  let connected = false;

  function connectToDup() {
    client.connect(
      destPort,
      destHost,
      function() {
        connected = true;
        logger.info("connected to dup host", destHost, destPort);
      }
    );
  }

  client.on("close", function() {
    connected = false;
    logger.info("connection closed and will reconnect after 5 minutes", destHost, destPort);
    setTimeout(connectToDup, 5 * 60 * 1000);
  });

  client.on("error", function(err) {
    connected = false;
    logger.info("dup socket error", destHost, destPort);
    logger.error(err);
  });

  connectToDup();

  return (ctx, next) => {
    if (connected) client.write(ctx.data);
    return next();
  };
};
