import Telegram from "telegram";
import Base from "./base";
import { assertFn, formatterFn, timeParser } from "./utils";

export default class MessageReport extends Base {
  get parser() {
    return new Telegram().endianess("big").nest("reportAt", {
      type: timeParser,
      formatter: formatterFn.formatTime,
    });
  }

  getSymbol() {
    const id = this.buffer.toString("hex", 0, 1);
    this.sliceBuffer(1);
    return id;
  }

  parseItem(symbol) {
    const item = new info[symbol]();
    item.parse(this.buffer);
    this.sliceBuffer(item.len);
    return { name: item.name, result: item.result };
  }

  parse(buffer) {
    this.buffer = buffer;
    const res = this.parser.decompress(this.buffer, true);
    ({ result: this.result, length: this.len } = res);
    this.sliceBuffer(this.len);
    let id = this.getSymbol();
    while (Object.keys(info).includes(id) && this.buffer.length > 1) {
      const { result, name } = this.parseItem(id);
      this.result[name] = result;
      id = this.getSymbol();
    }
    return this.result;
  }
}

class Vehicle extends Base {
  get name() {
    return "vehicle";
  }

  get parser() {
    return (
      new Telegram()
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
        .uint8("brake", { formatter: formatterFn.genOpt(0.01) })
    ); // 制动行程
  }
}

class Motor extends Base {
  get name() {
    return "motor";
  }

  get parser() {
    return new Telegram()
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
  }
}

class Fuelcell extends Base {
  get name() {
    return "fuelcell";
  }

  get parser() {
    return (
      new Telegram()
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
        })
    );
  }
}

class Engine extends Base {
  get name() {
    return "engine";
  }

  get parser() {
    return (
      new Telegram()
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
        .uint16("fcRate", { formatter: formatterFn.genOpt(0.01, 0, 0xfffe, 0xffff) })
    ); // 燃料消耗率
  }
}

class Location extends Base {
  get name() {
    return "location";
  }

  get parser() {
    return new Telegram()
      .endianess("big")
      .uint8("state") // 定位状态
      .uint32("lng", { formatter: formatterFn.genOpt(0.000001, 0, 0xfffe, 0xffff) }) // 经度
      .uint32("lat", { formatter: formatterFn.genOpt(0.000001, 0, 0xfffe, 0xffff) }); // 纬度
  }
}

class Extreme extends Base {
  get name() {
    return "extreme";
  }

  get parser() {
    return new Telegram()
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
  }
}

class Alarm extends Base {
  get name() {
    return "alarm";
  }

  get parser() {
    const errListParser = new Telegram()
      .uint8("type") // 故障码类型
      .uint16("code") // 故障编码
      .uint8("level"); // 故障级别

    const uasParser = new Telegram()
      .skip(1)
      .bit5("reserved")
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

    return (
      new Telegram()
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
        })
    );
  }

  filter() {
    delete this.result.uas.reserved;
  }
}

class RessVoltage extends Base {
  get name() {
    return "ressVoltage";
  }

  get parser() {
    return new Telegram()
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
  }
}

class RessTemperature extends Base {
  get name() {
    return "ressTemperature";
  }

  get parser() {
    return new Telegram()
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
  }
}

class CustomExt extends Base {
  get name() {
    return "customExt";
  }

  get parser() {
    return (
      new Telegram()
        .endianess("big")
        .uint16("dataLen") // 数据长度
        .uint8("pressure1", { formatter: formatterFn.genOpt(4) }) // 气压1
        .uint8("pressure2", { formatter: formatterFn.genOpt(4) }) // 气压2
        .uint8("batteryVoltage", { formatter: formatterFn.genOpt(0.5) }) // 蓄电池电压
        .uint16("dcov", { formatter: formatterFn.genOpt(0.1, -10000) }) // // DCDC输出电压
        .uint16("dcoc", { formatter: formatterFn.genOpt(0.1, -10000, 0xfffe, 0xffff) }) // DCDC输出电流
        .uint8("dcTemp", { formatter: formatterFn.genOpt(1, -40) }) // DCDC散热器温度
        .uint8("acTemp", { formatter: formatterFn.genOpt(1, -40) }) // DCAC散热器温度
        .uint8("lftp", { formatter: formatterFn.genOpt(4) }) // 左前轮胎压力
        .uint8("lftt", { formatter: formatterFn.genOpt(1, -40) }) // 左前轮胎温度
        .uint8("rftp", { formatter: formatterFn.genOpt(4, 0) }) // 右前轮胎压力
        .uint8("rftt", { formatter: formatterFn.genOpt(1, -40) }) // 右前轮胎温度
        .uint8("lr1tp", { formatter: formatterFn.genOpt(4) }) // 左后 1 轮胎压力
        .uint8("lr1tt", { formatter: formatterFn.genOpt(1, -40) }) // 左后 1 轮胎温度
        .uint8("lr2tp", { formatter: formatterFn.genOpt(4) }) // 左后 2 轮胎压力
        .uint8("lr2tt", { formatter: formatterFn.genOpt(1, -40) }) // 左后 2 轮胎温度
        .uint8("rr1tp", { formatter: formatterFn.genOpt(4) }) // 右后 1 轮胎压力
        .uint8("rr1tt", { formatter: formatterFn.genOpt(1, -40) }) // 右后 1 轮胎温度
        .uint8("rr2tp", { formatter: formatterFn.genOpt(4) }) // 右后 2 轮胎压力
        .uint8("rr2tt", { formatter: formatterFn.genOpt(1, -40) }) // 右后 2 轮胎温度
        .uint16("cv", { formatter: formatterFn.genOpt(0.1, 0, 0xfffe, 0xffff) }) // 充电电压
        .uint16("rc", { formatter: formatterFn.genOpt(0.1, -10000, 0xfffe, 0xffff) }) // 充电电流
        .uint16("cp", { formatter: formatterFn.genOpt(0.1, 0, 0xfffe, 0xffff) }) // 充电电量
        .uint32("totalCharge", { formatter: formatterFn.genOpt(0.1, 0, 0xfffffffe, 0xffffffff) }) // 累积充电电量
        .uint32("totalDischarge", { formatter: formatterFn.genOpt(0.1, 0, 0xfffffffe, 0xffffffff) }) // 累积放电电量
        .uint16("instantPower", { formatter: formatterFn.genOpt(0.1, 0, 0xfffe, 0xffff) }) // 瞬时电耗
        .uint16("bpiRes", { formatter: formatterFn.genOpt(1, 0, 0xfffe, 0xffff) }) // 电池正绝缘电阻
        .uint16("bniRes", { formatter: formatterFn.genOpt(1, 0, 0xfffe, 0xffff) }) // 电池负绝缘电阻
        .uint8("apTemp", { formatter: formatterFn.genOpt(1, -40) }) // 气泵扇热器温度
        .uint8("motorContTemp", { formatter: formatterFn.genOpt(1, -40) }) // 电机控制器温度
        // 空调开启模式
        .uint8("airMode", {
          formatter: val => {
            switch (val) {
              case 0:
                return "OFF"; // 关闭
              case 1:
                return "WIND"; // 进风
              case 2:
                return "HEATING"; // 制热
              case 3:
                return "REFRIGERATION"; // 制冷
              case 0xff:
                return "INVALID"; // 无效
            }
          },
        })
        .uint8("airTemp", { formatter: formatterFn.genOpt(1, -40) }) // 空调设定温度
        .uint8("insideTemp", { formatter: formatterFn.genOpt(1, -40) }) // 车厢内实际温度
        .uint8("outsideTemp", { formatter: formatterFn.genOpt(1, -40) }) // 车外温度
        .uint8("status")
    ); // 状态
  }

  filter() {
    const statusEnum = val => {
      switch (val) {
        case 0:
          return "NOSIGNAL"; // 无信号
        case 1:
          return "ON"; // 开
        case 2:
          return "ABNORMAL"; // 异常
      }
      return "INVALID"; // 无效
    };

    const keyEnum = val => {
      switch (val) {
        case 0:
          return "OFF"; //
        case 1:
          return "ACC"; //
        case 2:
          return "ON"; //
      }
      return "START"; //
    };
    const keyPosition = this.result.status & 0x03;
    const handbrakeStatus = (this.result.status & 0x0c) >> 2;
    const frontDoorStatus = (this.result.status & 0x30) >> 4;
    const middleDoorStatus = (this.result.status & 0xc0) >> 6;
    this.result.keyPosition = keyEnum(keyPosition); // 钥匙位置
    this.result.handbrakeStatus = statusEnum(handbrakeStatus); // 手刹状态
    this.result.frontDoorStatus = statusEnum(frontDoorStatus); // 前门状态
    this.result.middleDoorStatus = statusEnum(middleDoorStatus); // 中门状态
  }
}

class TenSeconds extends Base {
  get name() {
    return "tenSeconds";
  }

  get parser() {
    // TODO: 临时修复一下，但是风险很高
    const count = (this.buffer.length - 1) / 10;
    return new Telegram().endianess("big").array("datas", {
      length: count,
      type: new Telegram()
        .skip(1)
        .uint8("accPedal", { formatter: formatterFn.genOpt(0.01) }) // 加速踏板行程
        .skip(1)
        // 制动踏板
        .uint8("brake", {
          formatter: val => {
            switch (val) {
              case 0:
                return "OFF";
              case 101:
                return "ON";
              default:
                return val * 0.01;
            }
          },
        })
        .skip(1)
        .uint16("speed", { formatter: formatterFn.genOpt(0.1, 0, 0xfffe, 0xffff) }) // 车速
        .skip(1)
        .uint16("totalCurrent", { formatter: formatterFn.genOpt(1, -1000, 0xfffe, 0xffff) }), // 总电流
    });
  }
}

const info = {
  "01": Vehicle,
  "02": Motor,
  "03": Fuelcell,
  "04": Engine,
  "05": Location,
  "06": Extreme,
  "07": Alarm,
  "08": RessVoltage,
  "09": RessTemperature,
  "80": CustomExt,
  "81": TenSeconds,
};
