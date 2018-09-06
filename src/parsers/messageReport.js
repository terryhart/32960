import Telegram from "@36node/telegram";
import { assertFn, formatterFn, timeParser } from "./utils";

const vehicle = new Telegram()
  .endianess("big")
  .uint8("status", {
    formatter: val => {
      switch (val) {
        case 1:
          return "ON"; // 车辆启动
        case 2:
          return "OFF"; // 熄火
        case 3:
          return "OTHER"; // 其他
        case 0xfe:
          return "ABNORMAL"; // 异常
        case 0xff:
          return "INVALID"; // 无效
      }
    },
  })
  // 充电状态
  .uint8("chargStatus", {
    formatter: val => {
      switch (val) {
        case 1:
          return "PARK_CHARGING"; // 停车充电
        case 2:
          return "MOVE_CHARGING"; // 行驶充电
        case 3:
          return "UNCHARGED"; // 未充电状态
        case 4:
          return "CHARGED"; // 充电完成
        case 0xfe:
          return "ABNORMAL"; // 异常
        case 0xff:
          return "INVALID"; // 无效
      }
    },
  })
  // 运行模式
  .uint8("mode", {
    formatter: val => {
      switch (val) {
        case 1:
          return "ELECTRIC"; // 纯电
        case 2:
          return "MIXED"; // 混合
        case 3:
          return "FUEL"; // 燃油
        case 0xfe:
          return "ABNORMAL"; // 异常
        case 0xff:
          return "INVALID"; // 无效
      }
    },
  })
  .uint16("speed", { formatter: formatterFn.genOpt(0.1, 0, 0xfffe, 0xffff) }) // 车速
  .uint32("mileage", { formatter: formatterFn.genOpt(0.1, 0, 0xfffffffe, 0xffffffff) }) // 累计里程
  .uint16("voltage", { formatter: formatterFn.genOpt(0.1, 0, 0xfffe, 0xffff) }) // 总电压
  .uint16("current", { formatter: formatterFn.genOpt(0.1, -10000, 0xfffe, 0xffff) }) // 总电流
  .uint8("soc", { formatter: formatterFn.genOpt(0.01) }) // SOC
  // DC-DC 状态
  .uint8("dcStatus", {
    formatter: val => {
      switch (val) {
        case 1:
          return "ON"; // 工作
        case 2:
          return "OFF"; // 断开
        case 0xfe:
          return "ABNORMAL"; // 0xFE 异常
        case 0xff:
          return "INVALID"; // 0xFF 无效
      }
    },
  })
  .uint8("shift", {
    formatter: val => val & 0x0f,
  }) // 档位
  .uint16("resistance") // 绝缘电阻
  .uint8("aptv", { formatter: formatterFn.genOpt(0.01) }) // 加速踏板行程值
  .uint8("brake", { formatter: formatterFn.genOpt(0.01) }); // 制动行程

const motor = new Telegram()
  .endianess("big")
  .uint8("count", { assert: assertFn.range(1, 253) }) // 驱动电机个数
  .array("motors", {
    length: "count",
    type: new Telegram()
      .uint8("no", { assert: assertFn.range(1, 253) }) // 驱动电机序号
      // 驱动电机状态
      .uint8("status", {
        formatter: val => {
          switch (val) {
            case 1:
              return "CONSUMPTION"; // 耗电
            case 2:
              return "GENERATION"; // 发电
            case 3:
              return "OFF"; // 关闭
            case 4:
              return "READY"; // 准备
            case 0xfe:
              return "ABNORMAL"; // 异常
            case 0xff:
              return "INVALID"; // 无效
          }
        },
      })
      .uint8("controlTemp", { formatter: formatterFn.genOpt(1, -40) }) // 驱动电机控制器温度
      .uint16("speed", { formatter: formatterFn.genOpt(1, -20000, 0xfffe, 0xffff) }) // 驱动电机转速
      .uint16("torque", { formatter: formatterFn.genOpt(0.1, -20000, 0xfffe, 0xffff) }) // 驱动电机转矩 (-2000 ~ 4553.1)
      .uint8("temp", { formatter: formatterFn.genOpt(1, -40) }) // 驱动电机温度
      .uint16("voltage", { formatter: formatterFn.genOpt(0.1, 0, 0xfffe, 0xffff) }) // 电机控制器输入电压
      .uint16("current", { formatter: formatterFn.genOpt(0.1, -10000, 0xfffe, 0xffff) }), // 电机控制器直流母线电流
  });

const fuelcell = new Telegram()
  .endianess("big")
  .uint16("voltage", { formatter: formatterFn.genOpt(0.1, 0, 0xfffe, 0xffff) }) // 电压
  .uint16("current", { formatter: formatterFn.genOpt(0.1, 0, 0xfffe, 0xffff) }) // 电流
  .uint16("conRate", { formatter: formatterFn.genOpt(0.01, 0, 0xfffe, 0xffff) }) // 消耗率
  .uint16("probeCount", { formatter: formatterFn.genOpt(1, 0, 0xfffe, 0xffff) }) // 温度探针总数
  // 探针温度值
  .array("ntcs", {
    type: "int8",
    length: "probeCount",
    formatter: arr => arr.map(val => val - 40),
  })
  .uint16("maxNtc", { formatter: formatterFn.genOpt(0.1, -400, 0xfffe, 0xffff) }) // 氢系统中最高温度
  .uint8("maxNtcNo", { formatter: formatterFn.genOpt() }) // 氢系统中最高温度探针代号
  .uint16("hcOfh", { formatter: formatterFn.genOpt(1, 0, 0xfffe, 0xffff) }) // 氢气最高浓度 Highest concentration of hydrogen
  .uint8("hcOfhNo", { formatter: formatterFn.genOpt() }) // 氢气最高浓度传感器代号 Highest concentration of hydrogen
  // 氢气最高压力
  .uint16("maxVoltageOfh", {
    formatter: val => {
      return val * 0.1;
    },
  })
  .uint8("maxVoltageOfhNo", { formatter: formatterFn.genOpt() }) // 氢气最高压力传感器代号
  // 高压DC/DC状态
  .uint8("dc", {
    formatter: val => {
      switch (val) {
        case 1:
          return "ON"; // 工作
        case 2:
          return "OFF"; // 断开
        case 0xfe:
          return "ABNORMAL"; // 0xFE 异常
        case 0xff:
          return "INVALID"; // 0xFF 无效
      }
    },
  });

const engine = new Telegram()
  .endianess("big")
  // 发动机状态
  .uint8("state", {
    formatter: val => {
      switch (val) {
        case 1:
          return "ON"; // 工作
        case 2:
          return "OFF"; // 断开
        case 0xfe:
          return "ABNORMAL"; // 0xFE 异常
        case 0xff:
          return "INVALID"; // 0xFF 无效
      }
    },
  })
  .uint16("csSpeed", { formatter: formatterFn.genOpt(1, 0, 0xfffe, 0xffff) }) // 曲轴转速
  .uint16("fcRate", { formatter: formatterFn.genOpt(0.01, 0, 0xfffe, 0xffff) }); // 燃料消耗率

const location = new Telegram()
  .endianess("big")
  .uint8("state") // 定位状态
  .uint32("lng", { formatter: formatterFn.genOpt(0.000001, 0, 0xfffe, 0xffff) }) // 经度
  .uint32("lat", { formatter: formatterFn.genOpt(0.000001, 0, 0xfffe, 0xffff) }); // 纬度

const extreme = new Telegram()
  .endianess("big")
  .uint8("maxVoltageSubSysNo", { formatter: formatterFn.genOpt() }) // 最高电压电池子系统号
  .uint8("maxVoltageSingNo", { formatter: formatterFn.genOpt() }) // 最高电压电池单体代号
  .uint16("maxVoltage", { formatter: formatterFn.genOpt(0.001, 0, 0xfffe, 0xffff) }) // 电池单体电压最高值
  .uint8("minVoltageSubSysNo", { formatter: formatterFn.genOpt() }) // 最低电压电池子系统号
  .uint8("minVoltageSingNo", { formatter: formatterFn.genOpt() }) // 最高电压电池单体代号
  .uint16("minVoltage", { formatter: formatterFn.genOpt(0.001, 0, 0xfffe, 0xffff) }) // 电池单体电压最低值
  .uint8("maxNtcSubSysNo", { formatter: formatterFn.genOpt() }) // 最高温度子系统号
  .uint8("maxNtcNo", { formatter: formatterFn.genOpt() }) // 最高温度探针序号
  .uint8("maxNtc", { formatter: formatterFn.genOpt(1, -40) }) // 最高温度值
  .uint8("minNtcSubSysNo", { formatter: formatterFn.genOpt() }) // 最低温度子系统号
  .uint8("minNtcNo", { formatter: formatterFn.genOpt() }) // 最低温度探针序号
  .uint8("minNtc", { formatter: formatterFn.genOpt(1, -40) }); // 最低温度值

const errListParser = new Telegram()
  .uint8("type") // 故障码类型
  .uint16("code") // 故障编码
  .uint8("level"); // 故障级别

const uasParser = new Telegram()
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

const alarm = new Telegram()
  .endianess("big")
  .uint8("maxLevel", { formatter: formatterFn.genOpt() }) // 最高报警等级
  // 通用报警标志
  .nest("uas", {
    type: uasParser,
    lengthInBytes: 4,
  })
  // 可充电储能装置故障总数N1
  .uint8("ressLen", { formatter: formatterFn.genOpt() })
  .array("ressList", {
    type: errListParser,
    length: "ressLen",
  }) // 可充电储能装置故障代码列表
  .uint8("mortorLen", { formatter: formatterFn.genOpt() }) // 驱动电机故障总数N2
  .array("mortorList", {
    type: errListParser,
    length: "mortorLen",
  }) // 驱动电机故障代码列表
  .uint8("engineLen", { formatter: formatterFn.genOpt() }) // 发动机故障总数N3
  .array("engineList", {
    type: errListParser,
    length: "engineLen",
  }) // 发动机故障代码列表
  .uint8("otherLen", { formatter: formatterFn.genOpt() }) // 其他故障总数N4
  .array("otherList", {
    type: errListParser,
    length: "otherLen",
  });

const ressVoltage = new Telegram()
  .endianess("big")
  .uint8("subCount") // 可充电储能子系统个数
  .array("subSystems", {
    length: "subCount",
    type: new Telegram()
      .uint8("no") // 可充电储能子系统编号
      .uint16("voltage", { formatter: formatterFn.genOpt(0.1, 0, 0xfffe, 0xffff) }) // 可充电储能装置电压
      .uint16("current", { formatter: formatterFn.genOpt(0.1, -10000, 0xfffe, 0xffff) }) // 可充电储能装置电流
      .uint16("batteryCount") // 单体电池总数
      .uint16("frameStartBatteryNo") // 本帧起始电池序号
      .uint8("frameBatteryCount") // 本帧单体电池总数
      .array("batteryVols", {
        type: "uint16be",
        length: "frameBatteryCount",
        formatter: arr => arr.map(val => val * 0.001),
      }),
  });

const ressTemperature = new Telegram()
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
        formatter: arr => arr.map(val => val - 40),
      }),
  });

const info = {
  "01": "vehicle",
  "02": "motor",
  "03": "fuelcell",
  "04": "engine",
  "05": "location",
  "06": "extreme",
  "07": "alarm",
  "08": "ressVoltage",
  "09": "ressTemperature",
  "80": "customExt",
  "81": "tenSeconds",
};

const infoPackages = {
  vehicle: vehicle,
  motor: motor,
  fuelcell: fuelcell,
  engine: engine,
  location: location,
  extreme: extreme,
  alarm: alarm,
  ressVoltage: ressVoltage,
  ressTemperature: ressTemperature,
  // "customExt": customExt,
  // "tenSeconds": tenSeconds,
};

const switchName = json => {
  const name = json.name;
  return infoPackages[name];
};

const messageItem = new Telegram()
  .endianess("big")
  .string("name", {
    length: 1,
    encoding: "hex",
    formatter: symbol => info[symbol],
  })
  .nest({ type: switchName });

const messageReport = new Telegram()
  .endianess("big")
  .nest("reportAt", {
    type: timeParser,
    formatter: formatterFn.formatTime,
  })
  .array("messageItems", {
    readUntil: 1,
    type: messageItem,
    formatter: arr => {
      let items = {};
      arr.forEach(item => {
        const { name, ...rest } = item;
        items[name] = rest;
      });
      return items;
    },
  });

export default messageReport;
