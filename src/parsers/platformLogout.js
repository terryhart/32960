import Telegram from "@36node/telegram";
import Base from "./base";
import { formatterFn, timeParser } from "./utils";

export default class PlatformLogout extends Base {
  get parser() {
    return new Telegram()
      .endianess("big")
      .nest("logoutAt", {
        type: timeParser,
        formatter: formatterFn.formatTime,
      })
      .uint16("sn");
  }
}
