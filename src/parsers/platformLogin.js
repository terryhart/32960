import Telegram from "@36node/telegram";
import Base from "./base";
import { formatterFn, timeParser } from "./utils";

export default class PlatformLogin extends Base {
  filter() {
    const picked = (({ loginAt, sn, userName, pass }) => ({ loginAt, sn, userName, pass }))(
      this.result
    );
    this.result = picked;
  }

  get parser() {
    return new Telegram()
      .endianess("big")
      .nest("loginAt", {
        type: timeParser,
        formatter: formatterFn.formatTime,
      })
      .uint16("sn")
      .string("userName", { length: 12, stripNull: true })
      .string("pass", { length: 20, stripNull: true })
      .string("encryptRule", { length: 1, encoding: "hex" });
  }
}
