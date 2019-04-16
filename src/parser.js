import Telegram from "@36node/telegram";
import { Decimal } from "decimal.js";

import * as cs from "./constants";

/**
 * assert functions
 */

function assertRange(low, high, exceptVals = []) {
  return num => {
    if (typeof num === "string") {
      num = parseInt(num, 10);
    }
    if (exceptVals.includes(num)) {
      return true;
    } else {
      return num >= low && num <= high;
    }
  };
}

/**
 * formatter functions
 */

function toDate() {
  // 采用北京时间
  return ({ year, MM, dd, HH, mm, ss }) =>
    new Date(`${year + 2000}-${MM}-${dd} ${HH}:${mm}:${ss}+08:00`);
}

function toNumber(res = 1, offset = 0, abnormal = 0xfe, invalid = 0xff) {
  return val => {
    switch (val) {
      case abnormal:
        return Number.NaN;
      case invalid:
        return undefined;
      default:
        return new Decimal(val)
          .times(res)
          .plus(offset)
          .toNumber();
    }
  };
}

function toEnum0(...candidates) {
  return val => {
    if (val === 0xfe) return "ABNORMAL";
    if (val === 0xff) return undefined;
    return candidates[val];
  };
}

function toEnum1(...candidates) {
  return toEnum0(undefined, ...candidates);
}

function toShift() {
  return val => {
    return cs.VEHICLE_SHIFT[val & 0x0f];
  };
}

/**
 * 时间
 */

const date = new Telegram()
  .endianess("big")
  .uint8("year", { assert: assertRange(0, 99) })
  .uint8("MM", { assert: assertRange(1, 12) })
  .uint8("dd", { assert: assertRange(1, 31) })
  .uint8("HH", { assert: assertRange(0, 23) })
  .uint8("mm", { assert: assertRange(0, 59) })
  .uint8("ss", { assert: assertRange(0, 59) });

/**
 * 实时信息上报和补发信息上报
 * 整车数据 0x01: "vehicle",
 * 驱动电机数据 0x02: "motor",
 * 燃料电池数据 0x03: "fuelcell",
 * 发动机数据 0x04: "engine",
 * 车辆位置 0x05: "location",
 * 极值数据 0x06: "extreme",
 * 报警数据 0x07: "alarm",
 * 可充电储能装置电压数据 0x08: "ressVoltage",
 * 可充电储能装置温度数据 0x09: "ressTemperature",
 * 自定义扩展数据 0x80: "customExt",
 * 十秒上传 0x81: "tenSeconds",
 */

export const info = {};

info[cs.REPORT.VEHICLE] = new Telegram()
  .endianess("big")
  .uint8("status", { formatter: toEnum1(...Object.keys(cs.VEHICLE_STATUS)) }) // 车辆状态
  .uint8("chargeStatus", { formatter: toEnum1(...Object.keys(cs.CHARGE_STATUS)) }) // 充电状态
  .uint8("mode", { formatter: toEnum1(...Object.keys(cs.VEHICLE_MODE)) }) // 能源类型
  .uint16("speed", { formatter: toNumber(0.1, 0, 0xfffe, 0xffff) }) // 车速
  .uint32("mileage", { formatter: toNumber(0.1, 0, 0xfffffffe, 0xffffffff) }) // 累计里程
  .uint16("voltage", { formatter: toNumber(0.1, 0, 0xfffe, 0xffff) }) // 总电压
  .uint16("current", { formatter: toNumber(0.1, -1000, 0xfffe, 0xffff) }) // 总电流
  .uint8("soc", { formatter: toNumber(0.01) }) // SOC
  .uint8("dcStatus", { formatter: toEnum1(...Object.keys(cs.DC_STATUS)) }) // DC-DC 状态
  .uint8("shift", { formatter: toShift() }) // 档位
  .uint16("resistance") // 绝缘电阻
  .uint8("aptv", { formatter: toNumber(0.01) }) // 加速踏板行程值
  .uint8("brake", { formatter: toNumber(0.01) }); // 制动行程

info[cs.REPORT.MOTOR] = new Telegram()
  .endianess("big")
  .uint8("count", { assert: assertRange(1, 253) }) // 驱动电机个数
  .array("motors", {
    length: "count",
    type: new Telegram()
      .uint8("no", { assert: assertRange(1, 253) }) // 驱动电机序号
      .uint8("status", { formatter: toEnum1(...Object.keys(cs.MOTOR_STATUS)) }) // 驱动电机状态
      .uint8("controlTemp", { formatter: toNumber(1, -40) }) // 驱动电机控制器温度
      .uint16("speed", { formatter: toNumber(1, -20000, 0xfffe, 0xffff) }) // 驱动电机转速
      .uint16("torque", { formatter: toNumber(0.1, -2000, 0xfffe, 0xffff) }) // 驱动电机转矩 (-2000 ~ 4553.1)
      .uint8("temp", { formatter: toNumber(1, -40) }) // 驱动电机温度
      .uint16("voltage", { formatter: toNumber(0.1, 0, 0xfffe, 0xffff) }) // 电机控制器输入电压
      .uint16("current", { formatter: toNumber(0.1, -1000, 0xfffe, 0xffff) }), // 电机控制器直流母线电流
  });

info[cs.REPORT.FUELCELL] = new Telegram()
  .endianess("big")
  .uint16("voltage", { formatter: toNumber(0.1, 0, 0xfffe, 0xffff) }) // 电压
  .uint16("current", { formatter: toNumber(0.1, 0, 0xfffe, 0xffff) }) // 电流
  .uint16("conRate", { formatter: toNumber(0.01, 0, 0xfffe, 0xffff) }) // 消耗率
  .uint16("probeCount", { formatter: toNumber(1, 0, 0xfffe, 0xffff) }) // 温度探针总数
  .array("ntcs", {
    type: "int8",
    length: "probeCount",
    formatter: arr => arr.map(toNumber(1, -40)),
  }) // 探针温度值
  .uint16("maxNtc", { formatter: toNumber(0.1, -40, 0xfffe, 0xffff) }) // 氢系统中最高温度
  .uint8("maxNtcNo", { formatter: toNumber() }) // 氢系统中最高温度探针代号
  .uint16("hcOfh", { formatter: toNumber(1, 0, 0xfffe, 0xffff) }) // 氢气最高浓度 Highest concentration of hydrogen
  .uint8("hcOfhNo", { formatter: toNumber() }) // 氢气最高浓度传感器代号 Highest concentration of hydrogen
  .uint16("maxVoltageOfh", { formatter: toNumber(0.1) }) // 氢气最高压力
  .uint8("maxVoltageOfhNo", { formatter: toNumber() }) // 氢气最高压力传感器代号
  .uint8("dc", { formatter: toEnum1(...Object.keys(cs.DC_STATUS)) }); // 高压DC/DC状态

info[cs.REPORT.ENGINE] = new Telegram()
  .endianess("big")
  .uint8("state", { formatter: toEnum1(...Object.keys(cs.ENGINE_STATUS)) }) // 发动机状态
  .uint16("csSpeed", { formatter: toNumber(1, 0, 0xfffe, 0xffff) }) // 曲轴转速
  .uint16("fcRate", { formatter: toNumber(0.01, 0, 0xfffe, 0xffff) }); // 燃料消耗率

info[cs.REPORT.LOCATION] = new Telegram()
  .endianess("big")
  .uint8("state") // 定位状态
  .uint32("lng", { formatter: toNumber(0.000001, 0, 0xfffe, 0xffff) }) // 经度
  .uint32("lat", { formatter: toNumber(0.000001, 0, 0xfffe, 0xffff) }); // 纬度

info[cs.REPORT.EXTREME] = new Telegram()
  .endianess("big")
  .uint8("maxVoltageSubSysNo", { formatter: toNumber() }) // 最高电压电池子系统号
  .uint8("maxVoltageSingNo", { formatter: toNumber() }) // 最高电压电池单体代号
  .uint16("maxVoltage", { formatter: toNumber(0.001, 0, 0xfffe, 0xffff) }) // 电池单体电压最高值
  .uint8("minVoltageSubSysNo", { formatter: toNumber() }) // 最低电压电池子系统号
  .uint8("minVoltageSingNo", { formatter: toNumber() }) // 最高电压电池单体代号
  .uint16("minVoltage", { formatter: toNumber(0.001, 0, 0xfffe, 0xffff) }) // 电池单体电压最低值
  .uint8("maxNtcSubSysNo", { formatter: toNumber() }) // 最高温度子系统号
  .uint8("maxNtcNo", { formatter: toNumber() }) // 最高温度探针序号
  .uint8("maxNtc", { formatter: toNumber(1, -40) }) // 最高单体电池温度值
  .uint8("minNtcSubSysNo", { formatter: toNumber() }) // 最低温度子系统号
  .uint8("minNtcNo", { formatter: toNumber() }) // 最低温度探针序号
  .uint8("minNtc", { formatter: toNumber(1, -40) }); // 最低温度值

const fault = new Telegram()
  .endianess("big")
  .uint8("type") // 故障码类型
  .uint16("code") // 故障编码
  .uint8("level"); // 故障级别

const uas = new Telegram()
  .endianess("big")
  .skip(1)
  .skip(5, { type: "bit" })
  .bit1("ressChargeOver") // 车载储能装置类型过充
  .bit1("motorTemp") // 驱动电机温度报警
  .bit1("highVolMuteStatus") // 高压互锁状态报警
  .bit1("motorControlTemp") // 驱动电机控制器温度报警
  .bit1("dcdcStatus") // DC-DC 状态报警
  .bit1("brake") // 制动系统报警
  .bit1("dcdcTemp") // DC-DC 温度报警
  .bit1("insulation") // 绝缘报警
  .bit1("batteryBadConsistency") // 电池单体一致性差报警
  .bit1("ressNotMatch") // 可充电储能系统不匹配报警
  .bit1("socJump") // SOC 跳变报警
  .bit1("socOver") // SOC 过高报警
  .bit1("batteryLow") // 单体电池欠压报警
  .bit1("batteryOver") // 单体电池过压报警
  .bit1("socLow") // SOC 低报警
  .bit1("ressVolLow") // 车载储能装置类型欠压报警
  .bit1("ressVolOver") // 车载储能装置类型过压报警
  .bit1("batteryTempOver") // 电池高温报警
  .bit1("tempDiff"); // 温度差异报警

info[cs.REPORT.ALARM] = new Telegram()
  .endianess("big")
  .uint8("maxLevel", { formatter: toNumber() }) // 最高报警等级
  .nest("uas", { type: uas, lengthInBytes: 4 }) // 通用报警标志
  .uint8("ressLen", { formatter: toNumber() }) // 可充电储能装置故障总数N1
  .array("ressList", { type: fault, length: "ressLen" }) // 可充电储能装置故障代码列表
  .uint8("mortorLen", { formatter: toNumber() }) // 驱动电机故障总数N2
  .array("mortorList", { type: fault, length: "mortorLen" }) // 驱动电机故障代码列表
  .uint8("engineLen", { formatter: toNumber() }) // 发动机故障总数N3
  .array("engineList", { type: fault, length: "engineLen" }) // 发动机故障代码列表
  .uint8("otherLen", { formatter: toNumber() }) // 其他故障总数N4
  .array("otherList", { type: fault, length: "otherLen" }); // 其他故障列表

info[cs.REPORT.RESS_VOLTAGE] = new Telegram()
  .endianess("big")
  .uint8("subCount") // 可充电储能子系统个数
  .array("subSystems", {
    length: "subCount",
    type: new Telegram()
      .uint8("no") // 可充电储能子系统编号
      .uint16("voltage", { formatter: toNumber(0.1, 0, 0xfffe, 0xffff) }) // 可充电储能装置电压
      .uint16("current", { formatter: toNumber(0.1, -1000, 0xfffe, 0xffff) }) // 可充电储能装置电流
      .uint16("batteryCount") // 单体电池总数
      .uint16("frameStartBatteryNo") // 本帧起始电池序号
      .uint8("frameBatteryCount") // 本帧单体电池总数
      .array("batteryVols", {
        type: "uint16be",
        length: "frameBatteryCount",
        formatter: arr => arr.map(toNumber(0.001)),
      }), // 单体电池电压
  });

info[cs.REPORT.RESS_TEMPERATURE] = new Telegram()
  .endianess("big")
  .uint8("subCount") // 可充电储能子系统个数
  .array("subSystems", {
    length: "subCount",
    type: new Telegram()
      .uint8("no") // 可充电储能子系统编号
      .uint16("probeCount") // 可充电储能温度探针个数
      .array("temps", {
        type: "uint8",
        length: "probeCount",
        formatter: arr => arr.map(toNumber(1, -40)),
      }), // 单体电池温度
  });

info[cs.REPORT.CUSTOM_EXT] = new Telegram()
  .endianess("big")
  .uint16("dataLen", {
    formatter: val => {
      if (val !== 0x30) throw new Error(`custome ext section has wrong lenth ${val}`);
      return val;
    },
  }) // 数据长度
  .uint8("pressure1", { formatter: toNumber(4) }) // 气压1
  .uint8("pressure2", { formatter: toNumber(4) }) // 气压2
  .uint8("batteryVoltage", { formatter: toNumber(0.5) }) // 蓄电池电压
  .uint16("dcov", { formatter: toNumber(0.1, -1000) }) // // DCDC输出电压
  .uint16("dcoc", { formatter: toNumber(0.1, -1000, 0xfffe, 0xffff) }) // DCDC输出电流
  .uint8("dcTemp", { formatter: toNumber(1, -40) }) // DCDC散热器温度
  .uint8("acTemp", { formatter: toNumber(1, -40) }) // DCAC散热器温度
  .uint8("lftp", { formatter: toNumber(4) }) // 左前轮胎压力
  .uint8("lftt", { formatter: toNumber(1, -40) }) // 左前轮胎温度
  .uint8("rftp", { formatter: toNumber(4, 0) }) // 右前轮胎压力
  .uint8("rftt", { formatter: toNumber(1, -40) }) // 右前轮胎温度
  .uint8("lr1tp", { formatter: toNumber(4) }) // 左后 1 轮胎压力
  .uint8("lr1tt", { formatter: toNumber(1, -40) }) // 左后 1 轮胎温度
  .uint8("lr2tp", { formatter: toNumber(4) }) // 左后 2 轮胎压力
  .uint8("lr2tt", { formatter: toNumber(1, -40) }) // 左后 2 轮胎温度
  .uint8("rr1tp", { formatter: toNumber(4) }) // 右后 1 轮胎压力
  .uint8("rr1tt", { formatter: toNumber(1, -40) }) // 右后 1 轮胎温度
  .uint8("rr2tp", { formatter: toNumber(4) }) // 右后 2 轮胎压力
  .uint8("rr2tt", { formatter: toNumber(1, -40) }) // 右后 2 轮胎温度
  .uint16("cv", { formatter: toNumber(0.1, 0, 0xfffe, 0xffff) }) // 充电电压
  .uint16("rc", { formatter: toNumber(0.1, -1000, 0xfffe, 0xffff) }) // 充电电流
  .uint16("cp", { formatter: toNumber(0.1, 0, 0xfffe, 0xffff) }) // 充电电量
  .uint32("totalCharge", { formatter: toNumber(0.1, 0, 0xfffffffe, 0xffffffff) }) // 累积充电电量
  .uint32("totalDischarge", { formatter: toNumber(0.1, 0, 0xfffffffe, 0xffffffff) }) // 累积放电电量
  .uint16("instantPower", { formatter: toNumber(0.1, 0, 0xfffe, 0xffff) }) // 瞬时电耗
  .uint16("bpiRes", { formatter: toNumber(1, 0, 0xfffe, 0xffff) }) // 电池正绝缘电阻
  .uint16("bniRes", { formatter: toNumber(1, 0, 0xfffe, 0xffff) }) // 电池负绝缘电阻
  .uint8("apTemp", { formatter: toNumber(1, -40) }) // 气泵扇热器温度
  .uint8("motorContTemp", { formatter: toNumber(1, -40) }) // 电机控制器温度
  .uint8("airMode", { formatter: toEnum0(...Object.keys(cs.AIR_MODE)) }) // 空调开启模式
  .uint8("airTemp", { formatter: toNumber(1, -40) }) // 空调设定温度
  .uint8("insideTemp", { formatter: toNumber(1, -40) }) // 车厢内实际温度
  .uint8("outsideTemp", { formatter: toNumber(1, -40) }) // 车外温度
  .bit2("middleDoorStatus", { formatter: toEnum0(...Object.keys(cs.DOOR_STATUS)) }) // 中门
  .bit2("frontDoorStatus", { formatter: toEnum0(...Object.keys(cs.DOOR_STATUS)) }) // 前门
  .bit2("handbrakeStatus", { formatter: toEnum0(...Object.keys(cs.HANDBRAKE_STATUS)) }) // 手刹
  .bit2("keyPosition", { formatter: toEnum0(...Object.keys(cs.KEY_POSITION)) }); // 钥匙

info[cs.REPORT.TEN_SECONDS] = new Telegram().endianess("big").array("datas", {
  length: 10,
  type: new Telegram()
    .skip(1)
    .uint8("accPedal", { formatter: toNumber(0.01) }) // 加速踏板行程
    .skip(1)
    .uint8("brake", { formatter: toNumber(0.01) }) // 制动踏板
    .skip(1)
    .uint16("speed", { formatter: toNumber(0.1, 0, 0xfffe, 0xffff) }) // 车速
    .skip(1)
    .uint16("totalCurrent", { formatter: toNumber(0.1, -1000, 0xfffe, 0xffff) }), // 总电流
});

const toTrue = val => {
  return val === 1;
};

info[cs.REPORT.ADAS] = new Telegram().endianess("big").array("datas", {
  length: 10,
  type: new Telegram()
    .skip(1)
    .uint8("accPedal", { formatter: toNumber(0.01) }) // 加速踏板行程
    .skip(1)
    .uint8("brake", { formatter: toNumber(0.01) }) // 制动踏板
    .skip(1)
    .uint16("speed", { formatter: toNumber(0.1, 0, 0xfffe, 0xffff) }) // 车速
    .skip(1)
    .uint16("totalCurrent", { formatter: toNumber(0.1, -1000, 0xfffe, 0xffff) }) // 总电流
    .skip(1)
    .uint8("overSpeed", { formatter: toNumber(5) }) // 超速值
    .skip(1)
    .uint8("lateralDistance", { formatter: toNumber(0.1, -12) }) // 前方障碍物横向距离
    .skip(1)
    .uint8("verticalDistance", { formatter: toNumber(1) }) // 前方障碍物纵向距离
    .skip(1)
    .uint8("relativeVelocity", { formatter: toNumber(1, -50) }) // 与前方障碍物的相对速度
    .skip(1)
    .bit4("wheelWarning", { formatter: toTrue }) // 方向盘振动器预警
    .bit4("buzzerWarning", { formatter: toTrue }) // 蜂鸣器预警
    .skip(1)
    .bit2("pWarning", { formatter: toTrue }) // 行人碰撞预警
    .bit2("rWarning", { formatter: toTrue }) // 右车道偏离预警
    .bit2("lWarning", { formatter: toTrue }) // 左车道偏离预警
    .bit2("cWarning", { formatter: toTrue }) // 前方碰撞预警
    .skip(1)
    .bit2("cmcsLevel") // 碰撞缓解制动系统预警等级
    .bit2("cmcs", { formatter: toEnum0(...Object.keys(cs.CMCS_STATUS)) }) // 碰撞缓解制动系统状态
    .bit2("crbs", { formatter: toTrue }) // 碰撞缓解制动系统开关状态
    .bit2("reserved")
    .skip(1)
    .uint8("obstacleType", { formatter: toEnum0(...Object.keys(cs.OBSTACLE_TYPE)) }) // 障碍物类型
    .skip(1)
    .uint16("fault"), // ADAS 故障码int
});

/**
 * 顶层命令:
 * 车辆登入 0x01: vehicleLogin
 * 实时信息上报 0x02: report
 * 补发信息上报 0x03: report
 * 车辆登出 0x04: logout
 * 平台登入0x05: platformLogin
 * 平台登出0x06: logout
 * 心跳 0x07: 空解析
 * 车辆校时 0x08: 空解析
 */

export const vehicleLogin = new Telegram()
  .endianess("big")
  .nest("at", {
    type: date,
    formatter: toDate(),
  })
  .uint16("sn", { assert: assertRange(1, 65531) })
  .string("iccid", { length: 20, stripNull: true })
  .uint8("subSysNm", { assert: assertRange(0, 250) })
  .uint8("subSysNmLen", { assert: assertRange(0, 50) })
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

export const platformLogin = new Telegram()
  .endianess("big")
  .nest("at", {
    type: date,
    formatter: toDate(),
  })
  .uint16("sn")
  .string("username", { length: 12, stripNull: true })
  .string("password", { length: 20, stripNull: true })
  .skip(1); // .string("encryptRule", { length: 1, encoding: "hex" });

export const logout = new Telegram()
  .endianess("big")
  .nest("at", {
    type: date,
    formatter: toDate(),
  })
  .uint16("sn");

export const report = new Telegram()
  .endianess("big")
  .nest("at", {
    type: date,
    formatter: toDate(),
  })
  .array("items", {
    readUntil: 1,
    type: new Telegram()
      .uint8("type", {
        formatter: val => {
          const map = {
            0x01: cs.REPORT.VEHICLE,
            0x02: cs.REPORT.MOTOR,
            0x03: cs.REPORT.FUELCELL,
            0x04: cs.REPORT.ENGINE,
            0x05: cs.REPORT.LOCATION,
            0x06: cs.REPORT.EXTREME,
            0x07: cs.REPORT.ALARM,
            0x08: cs.REPORT.RESS_VOLTAGE,
            0x09: cs.REPORT.RESS_TEMPERATURE,
            0x80: cs.REPORT.CUSTOM_EXT,
            0x81: cs.REPORT.TEN_SECONDS,
            0x82: cs.REPORT.ADAS,
          };
          if (!map[val]) {
            throw new Error(`report has wrong info type ${val.toString(16)}`);
          }
          return map[val];
        },
      })
      .nest({ type: data => info[data.type] }),
  });

/**
 * 整个包
 */
function getBodyParser(data) {
  switch (data.command) {
    case cs.COMMAND.VEHICLE_LOGIN:
      return vehicleLogin;
    case cs.COMMAND.REALTIME_REPORT:
    case cs.COMMAND.REISSUE_REPORT:
      return report;
    case cs.COMMAND.VEHICLE_LOGOUT:
    case cs.COMMAND.PLATFORM_LOGOUT:
      return logout;
    case cs.COMMAND.PLATFORM_LOGIN:
      return platformLogin;
    default:
      return new Telegram(); // TODO: telegram nest 应支持空
  }
}

function flagFormatter(val) {
  if (val === 0xfe) return cs.FLAG.COMMAND; // 非常特殊的
  return toEnum1(...Object.keys(cs.FLAG))(val);
}

export default new Telegram()
  .endianess("big")
  .skip(2)
  .uint8("command", { formatter: toEnum1(...Object.keys(cs.COMMAND)) })
  .uint8("flag", { formatter: flagFormatter })
  .string("vin", { length: 17, stripNull: true })
  .uint8("encrypt", { formatter: toEnum1(...Object.keys(cs.ENCRYPT)) })
  .uint16("length")
  .nest("body", { type: getBodyParser })
  .skip(1);
