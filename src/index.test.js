import Protocol from "./index";

const protocol = new Protocol();

it("Login", () => {
  const buf = Buffer.from(
    "232301fe4C46574144524A463031313030323334360100281206050B2C1D00013833363035333337393831363035343930313837020531303030313130303032C2",
    "hex"
  );
  const req = protocol.parse(buf);
  expect(req.length).toBe(40);
  expect(req).toEqual({
    command: "VEHICLE_LOGIN",
    length: 40,
    encrypt: "NONE",
    flag: "COMMAND",
    vin: "LFWADRJF011002346",
    body: {
      at: new Date("2018-06-05T11:44:29+08:00"),
      iccid: "83605337981605490187",
      sn: 1,
      subSysNm: 2,
      subSysNmLen: 5,
      subSysSn: ["10001", "10002"],
    },
  });
});

it("Realtime Report", () => {
  const buf = Buffer.from(
    "232302FE45525230383033303030303030303030300100B71206170C05020101030100320000023D1B583A9832013E121D0065020101013C61A888B83C00783A980500072733A101CF049C060111064001020500010150010540070000000000000000000801011B583A9800110001110640050006400640064006400640064006400640064006400640064006400640064009010100055040404040800030CD0036277E32B038380500000000000000000000001766271A000000000000000000000000121D0000383C000000001674",
    "hex"
  );
  const req = protocol.parse(buf);
  expect(req.length).toBe(183);
  expect(req).toEqual({
    command: "REALTIME_REPORT",
    flag: "COMMAND",
    vin: "ERR08030000000000",
    encrypt: "NONE",
    length: 183,
    body: {
      at: new Date("2018-06-23T04:05:02.000Z"),
      items: [
        {
          type: "VEHICLE",
          status: "ON",
          chargeStatus: "UNCHARGED",
          mode: "ELECTRIC",
          speed: 5,
          mileage: 57.3,
          voltage: 700,
          current: 500,
          soc: 0.5,
          dcStatus: "ON",
          shift: "D",
          resistance: 4637,
          aptv: 0,
          brake: 1.01,
        },
        {
          type: "MOTOR",
          count: 1,
          motors: [
            {
              no: 1,
              status: "CONSUMPTION",
              controlTemp: 20,
              speed: 5000,
              torque: 1500,
              temp: 20,
              voltage: 12,
              current: 500,
            },
          ],
        },
        {
          type: "LOCATION",
          state: 0,
          lng: 120.009633,
          lat: 30.344348,
        },
        {
          type: "EXTREME",
          maxVoltageSubSysNo: 1,
          maxVoltageSingNo: 17,
          maxVoltage: 1.6,
          minVoltageSubSysNo: 1,
          minVoltageSingNo: 2,
          minVoltage: 1.28,
          maxNtcSubSysNo: 1,
          maxNtcNo: 1,
          maxNtc: 40,
          minNtcSubSysNo: 1,
          minNtcNo: 5,
          minNtc: 24,
        },
        {
          type: "ALARM",
          maxLevel: 0,
          uas: {
            ressChargeOver: 0,
            motorTemp: 0,
            highVolMuteStatus: 0,
            motorControlTemp: 0,
            dcdcStatus: 0,
            brake: 0,
            dcdcTemp: 0,
            insulation: 0,
            batteryBadConsistency: 0,
            ressNotMatch: 0,
            socJump: 0,
            socOver: 0,
            batteryLow: 0,
            batteryOver: 0,
            socLow: 0,
            ressVolLow: 0,
            ressVolOver: 0,
            batteryTempOver: 0,
            tempDiff: 0,
          },
          ressLen: 0,
          ressList: [],
          mortorLen: 0,
          mortorList: [],
          engineLen: 0,
          engineList: [],
          otherLen: 0,
          otherList: [],
        },
        {
          type: "RESS_VOLTAGE",
          subCount: 1,
          subSystems: [
            {
              no: 1,
              voltage: 700,
              current: 500,
              batteryCount: 17,
              frameStartBatteryNo: 1,
              frameBatteryCount: 17,
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
            },
          ],
        },
        {
          type: "RESS_TEMPERATURE",
          subCount: 1,
          subSystems: [
            {
              no: 1,
              probeCount: 5,
              temps: [40, 24, 24, 24, 24],
            },
          ],
        },
        {
          type: "CUSTOM_EXT",
          dataLen: 48,
          pressure1: 820,
          pressure2: 0,
          batteryVoltage: 27,
          dcov: 11,
          dcoc: 297.6,
          dcTemp: 16,
          acTemp: 16,
          lftp: 20,
          lftt: -40,
          rftp: 0,
          rftt: -40,
          lr1tp: 0,
          lr1tt: -40,
          lr2tp: 0,
          lr2tt: -40,
          rr1tp: 0,
          rr1tt: -40,
          rr2tp: 0,
          rr2tt: -40,
          cv: 599,
          rc: 1,
          cp: 0,
          totalCharge: 0,
          totalDischarge: 0,
          instantPower: 0,
          bpiRes: 4637,
          bniRes: 0,
          apTemp: 16,
          motorContTemp: 20,
          airMode: "OFF",
          airTemp: -40,
          insideTemp: -40,
          outsideTemp: -40,
          middleDoorStatus: "CLOSE",
          frontDoorStatus: "OPEN",
          handbrakeStatus: "ON",
          keyPosition: "ON",
        },
      ],
    },
  });
});

it("response heart beat", () => {
  const buf = Buffer.from("232307FE4838323230363530303030303030303030010000BB", "hex");
  const req = protocol.parse(buf);
  const resBuf = protocol.respond(req, buf);
  expect(protocol.shouldRespond(buf)).toBe(true);
  expect(resBuf.toString("hex")).toEqual("23230701483832323036353030303030303030303001000044");
});

it("response time check", () => {
  const buf = Buffer.from("232308FE4552523038303330303030303030303030010000B9", "hex");
  const req = protocol.parse(buf);
  const resBuf = protocol.respond(req, buf);
  expect(protocol.shouldRespond(buf)).toBe(true);
  expect(resBuf.toString("hex")).toMatch(/232308014552523038303330303030303030303030010006/);
});
