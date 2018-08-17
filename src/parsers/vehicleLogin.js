import Telegram from "@36node/telegram";
import Base from "./base";
import { assertFn, formatterFn, timeParser } from "./utils";

export default class VehicleLogin extends Base {
  get headerParser() {
    return new Telegram()
      .endianess("big")
      .nest("loginAt", {
        type: timeParser,
        formatter: formatterFn.formatTime,
      })
      .uint16("sn", { assert: assertFn.range(1, 65531) })
      .string("iccid", { length: 20, stripNull: true })
      .uint8("subSysNm", { assert: assertFn.range(0, 250) })
      .uint8("subSysNmLen", { assert: assertFn.range(0, 50) });
  }

  get tailParser() {
    const { subSysNm, subSysNmLen } = this.result;
    return new Telegram()
      .endianess("big")
      .array("subSysSn", { length: subSysNm, type: "string", subOptions: { length: subSysNmLen } });
  }

  parse(buffer) {
    this.buffer = buffer;
    this.result = this.headerParser.decompress(this.buffer);

    const { subSysNmLen } = this.result;
    if (subSysNmLen === 0) {
      this.result.subSysSn = [];
    } else {
      this.buffer = this.buffer.slice(this.headerLength);
      const tmp = this.tailParser.decompress(this.buffer);
      this.result = { ...this.result, ...tmp };
    }

    this.filter();
    return this.result;
  }

  get headerLength() {
    return 30;
  }
}
