import Telegram from "@36node/telegram";
import { assertFn } from "./utils";
import packages from "./packages";

const switchPackage = json => {
  const commandID = json.commandIDHex;
  return packages[commandID];
};

export default class BasicInfo {
  constructor(buffer) {
    this.len = null;
    this.buffer = buffer;
    this.result = this.parse();
  }

  parse() {
    const res = this.parser.decompress(this.buffer, true);
    ({ result: this.result, length: this.len } = res);
    this.filter();
    return this.result;
  }

  filter() {
    delete this.result.magicSymbol;
    delete this.result.responseId;
    delete this.result.encrypt;
    delete this.result.dataLength;
    delete this.result.bcc;
    if (this.result.hasOwnProperty("messageItems")) {
      const { messageItems, ...rest } = this.result;
      this.result = { ...rest, ...messageItems };
    }
  }

  get parser() {
    return new Telegram()
      .endianess("big")
      .string("magicSymbol", { length: 2, assert: "##" })
      .string("commandIDHex", { length: 1, encoding: "hex" })
      .string("responseId", { length: 1, encoding: "hex" })
      .string("vin", { length: 17, stripNull: true })
      .string("encrypt", { length: 1, encoding: "hex" })
      .uint16("dataLength", { assert: assertFn.range(0, 65531) })
      .nest({ type: switchPackage })
      .uint8("bcc");
  }

  get toJSON() {
    return this.result;
  }

  get length() {
    return this.len;
  }
}
