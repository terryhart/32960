import Telegram from "@36node/telegram";
import Base from "./base";
import { assertFn } from "./utils";

export default class BasicInfo extends Base {
  filter() {
    const picked = (({ commandIDHex, vin }) => ({ commandIDHex, vin }))(this.result);
    this.result = picked;
  }

  get parser() {
    return new Telegram()
      .endianess("big")
      .string("magicSymbol", { length: 2, assert: "##" })
      .string("commandIDHex", { length: 1, encoding: "hex" })
      .string("responseId", { length: 1, encoding: "hex" })
      .string("vin", { length: 17, stripNull: true })
      .string("encrypt", { length: 1, encoding: "hex" })
      .uint16("dataLength", { assert: assertFn.range(0, 65531) });
  }
}
