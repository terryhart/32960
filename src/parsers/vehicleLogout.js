import Telegram from "telegram";
import Base from "./base";
import { formatterFn, timeParser } from "./utils";

export default class VehicleLogout extends Base {
  get parser() {
    return new Telegram()
      .endianess("big")
      .nest("logoutAt", {
        type: timeParser,
        formatter: formatterFn.formatTime
      })
      .uint16("sn");
  }
}
