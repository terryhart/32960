#!/usr/bin/env node

import { PORT } from "./config";
import commander from "commander";
import Protocol from "./protocol";
import clipboardy from "clipboardy";

commander
  .command("server")
  .description("Start 32960 server")
  .action(() => {
    const server = require("./server").default;
    server.listen(PORT, () => console.log(`app started at ${PORT}`));
  });

commander
  .command("parse")
  .description("Parse binary message data")
  .option("-d, --data <data>", "Binary hex data of message")
  .option("-c, --copy_to_clipboard", "Whether copy parsed result to clipboard")
  .action(cmd => {
    const data = cmd.data;

    if (!data) {
      console.log("No data specify!");
    } else {
      try {
        const protocol = new Protocol();
        const buf = Buffer.from(data, "hex");
        const req = protocol.parse(buf);

        const jsStr = JSON.stringify(req, 0, 2);

        if (cmd.copy_to_clipboard) {
          clipboardy.writeSync(jsStr);
          console.log("Parsed success, result has copied to your clipboard!");
        } else {
          console.log(jsStr);
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

commander.parse(process.argv);
