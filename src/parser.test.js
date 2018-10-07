import { vehicleLogin, logout, info } from "./parser";
import * as cs from "./constants";

// 车辆登入
it("Vehicle Login", () => {
  const buf = Buffer.from(
    "1206050B2C1D00013833363035333337393831363035343930313837020531303030313130303032",
    "hex"
  );
  const result = vehicleLogin.decompress(buf);
  expect(result).toEqual({
    subSysSn: ["10001", "10002"],
    at: new Date("2018-06-05T11:44:29+08:00"),
    sn: 1,
    iccid: "83605337981605490187",
    subSysNm: 2,
    subSysNmLen: 5,
  });
});

// TODO: add platform login test
// 平台登入
it("Platform Login", () => {});

// 车辆或者平台登出
it("Vehicle or Platform Logout", () => {
  const buf = Buffer.from("1206161015150046", "hex");
  const result = logout.decompress(buf);
  expect(result).toEqual({
    at: new Date("2018-06-22T16:21:21+08:00"),
    sn: 70,
  });
});

// 整车数据
it("Vehicle Data", () => {
  const buf = Buffer.from("0103010032000013881b58000032013e01d21465", "hex");
  const result = info[cs.REPORT.VEHICLE].decompress(buf);
  expect(result).toEqual({
    aptv: 0.2,
    brake: 1.01,
    chargeStatus: "UNCHARGED",
    current: -1000,
    dcStatus: "ON",
    mileage: 500,
    mode: "ELECTRIC",
    resistance: 466,
    shift: "D",
    soc: 0.5,
    speed: 5,
    status: "ON",
    voltage: 700,
  });
});

// 驱动电机数据
it("Motor Data", () => {
  const buf = Buffer.from("0202014B639C3A346D187C271001014B639C3A346D187C2710", "hex");
  const result = info[cs.REPORT.MOTOR].decompress(buf);
  expect(result).toEqual({
    count: 2,
    motors: [
      {
        no: 2,
        status: "CONSUMPTION",
        controlTemp: 35,
        speed: 5500,
        torque: -510,
        temp: 69,
        voltage: 626.8,
        current: 0,
      },
      {
        no: 1,
        status: "CONSUMPTION",
        controlTemp: 35,
        speed: 5500,
        torque: -510,
        temp: 69,
        voltage: 626.8,
        current: 0,
      },
    ],
  });
});

// 燃料电池数据
// TODO: 没有测试数据
it("Fuelcell Data", () => {});

// 发动机数据
// TODO: 补充发动机数据测试
it("Engine Data", () => {});

// 车辆位置
it("Vehicle Location", () => {
  const buf = Buffer.from("00072733A101CF049C", "hex");
  const result = info[cs.REPORT.LOCATION].decompress(buf);
  expect(result).toEqual({ lat: 30.344348, lng: 120.009633, state: 0 });
});

// 极值数据
it("Extreme Data", () => {
  const buf = Buffer.from("0111064001020500010150010540", "hex");
  const result = info[cs.REPORT.EXTREME].decompress(buf);
  expect(result).toEqual({
    maxNtc: 40,
    maxNtcNo: 1,
    maxNtcSubSysNo: 1,
    maxVoltage: 1.6,
    maxVoltageSingNo: 17,
    maxVoltageSubSysNo: 1,
    minNtc: 24,
    minNtcNo: 5,
    minNtcSubSysNo: 1,
    minVoltage: 1.28,
    minVoltageSingNo: 2,
    minVoltageSubSysNo: 1,
  });
});

// 报警数据
it("Alarm Data", () => {
  const buf = Buffer.from("0000000000000000000801011B58", "hex");
  const result = info[cs.REPORT.ALARM].decompress(buf);
  expect(result).toEqual({
    engineLen: 0,
    engineList: [],
    maxLevel: 0,
    mortorLen: 0,
    mortorList: [],
    otherLen: 0,
    otherList: [],
    ressLen: 0,
    ressList: [],
    uas: {
      batteryTempOver: 0,
      brake: 0,
      dcdcStatus: 0,
      dcdcTemp: 0,
      highVolMuteStatus: 0,
      insulation: 0,
      motorControlTemp: 0,
      motorTemp: 0,
      ressChargeOver: 0,
      ressNotMatch: 0,
      ressVolLow: 0,
      ressVolOver: 0,
      batteryBadConsistency: 0,
      batteryLow: 0,
      batteryOver: 0,
      socJump: 0,
      socLow: 0,
      socOver: 0,
      tempDiff: 0,
    },
  });
});

// 可充电储能装置电压数据
it("RessVoltage Data", () => {
  const buf = Buffer.from(
    "01011B583A98001100011106400500064006400640064006400640064006400640064006400640064006400640",
    "hex"
  );
  const result = info[cs.REPORT.RESS_VOLTAGE].decompress(buf);
  expect(result).toEqual({
    subCount: 1,
    subSystems: [
      {
        batteryCount: 17,
        batteryVols: [
          1.6,
          1.28,
          1.6,
          1.6,
          1.6,
          1.6,
          1.6,
          1.6,
          1.6,
          1.6,
          1.6,
          1.6,
          1.6,
          1.6,
          1.6,
          1.6,
          1.6,
        ],
        current: 500,
        frameBatteryCount: 17,
        frameStartBatteryNo: 1,
        no: 1,
        voltage: 700,
      },
    ],
  });
});

// 可充电储能装置温度数据
it("ressTemperature Data", () => {
  const buf = Buffer.from("010100055040404040", "hex");
  const result = info[cs.REPORT.RESS_TEMPERATURE].decompress(buf);
  expect(result).toEqual({
    subCount: 1,
    subSystems: [{ no: 1, probeCount: 5, temps: [40, 24, 24, 24, 24] }],
  });
});

// 自定义扩展数据
it("CustomExt Data", () => {
  const buf = Buffer.from(
    "0030CD0036277E32B038380500000000000000000000001766271A000000000000000000000000121D0000383C0000000016",
    "hex"
  );
  const result = info[cs.REPORT.CUSTOM_EXT].decompress(buf);
  expect(result).toEqual({
    acTemp: 16,
    airMode: "OFF",
    airTemp: -40,
    apTemp: 16,
    batteryVoltage: 27,
    bniRes: 0,
    bpiRes: 4637,
    cp: 0,
    cv: 599,
    dataLen: 48,
    dcTemp: 16,
    dcoc: 297.6,
    dcov: 11,
    frontDoorStatus: "OPEN",
    handbrakeStatus: "ON",
    insideTemp: -40,
    instantPower: 0,
    keyPosition: "ON",
    lftp: 20,
    lftt: -40,
    lr1tp: 0,
    lr1tt: -40,
    lr2tp: 0,
    lr2tt: -40,
    middleDoorStatus: "CLOSE",
    motorContTemp: 20,
    outsideTemp: -40,
    pressure1: 820,
    pressure2: 0,
    rc: 1,
    rftp: 0,
    rftt: -40,
    rr1tp: 0,
    rr1tt: -40,
    rr2tp: 0,
    rr2tt: -40,
    totalCharge: 0,
    totalDischarge: 0,
  });
});

// 10s 上传
it("TenSeconds Data", () => {
  const buf = Buffer.from(
    "0100020003000004271001000200030000042710010002000300000427100100020003000004271001000200030000042710010002000300000427100100020003000004271001000200030000042710010002000300000427100100020003000004271061",
    "hex"
  );
  const result = info[cs.REPORT.TEN_SECONDS].decompress(buf);
  expect(result).toEqual({
    datas: [
      {
        accPedal: 0,
        brake: 0,
        speed: 0,
        totalCurrent: 9000,
      },
      {
        accPedal: 0,
        brake: 0,
        speed: 0,
        totalCurrent: 9000,
      },
      {
        accPedal: 0,
        brake: 0,
        speed: 0,
        totalCurrent: 9000,
      },
      {
        accPedal: 0,
        brake: 0,
        speed: 0,
        totalCurrent: 9000,
      },
      {
        accPedal: 0,
        brake: 0,
        speed: 0,
        totalCurrent: 9000,
      },
      {
        accPedal: 0,
        brake: 0,
        speed: 0,
        totalCurrent: 9000,
      },
      {
        accPedal: 0,
        brake: 0,
        speed: 0,
        totalCurrent: 9000,
      },
      {
        accPedal: 0,
        brake: 0,
        speed: 0,
        totalCurrent: 9000,
      },
      {
        accPedal: 0,
        brake: 0,
        speed: 0,
        totalCurrent: 9000,
      },
      {
        accPedal: 0,
        brake: 0,
        speed: 0,
        totalCurrent: 9000,
      },
    ],
  });
});
