import Telegram from "@36node/telegram";
import { assertFn, formatterFn, timeParser } from "./utils";
import messageReport from "./messageReport";

const vehicleLogin = new Telegram()
  .endianess("big")
  .nest("loginAt", {
    type: timeParser,
    formatter: formatterFn.formatTime,
  })
  .uint16("sn", { assert: assertFn.range(1, 65531) })
  .string("iccid", { length: 20, stripNull: true })
  .uint8("subSysNm", { assert: assertFn.range(0, 250) })
  .uint8("subSysNmLen", { assert: assertFn.range(0, 50) })
  .array("subSysSn", {
    length: json => {
      if (json.subSysNmLen === 0) {
        return 0;
      } else {
        return json.subSysNm;
      }
    },
    type: "string",
    subOptions: { length: "subSysNmLen" },
  });

const platformLogin = new Telegram()
  .endianess("big")
  .nest("loginAt", {
    type: timeParser,
    formatter: formatterFn.formatTime,
  })
  .uint16("sn")
  .string("userName", { length: 12, stripNull: true })
  .string("pass", { length: 20, stripNull: true })
  .skip(1); // .string("encryptRule", { length: 1, encoding: "hex" });

const logout = new Telegram()
  .endianess("big")
  .nest("logoutAt", {
    type: timeParser,
    formatter: formatterFn.formatTime,
  })
  .uint16("sn");

const packages = {
  "01": vehicleLogin,
  "02": messageReport,
  "03": messageReport,
  "04": logout,
  "05": platformLogin,
  "06": logout,
};

export default packages;
