import Protocol from "./protocol";
import * as cs from "./constants";

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

it("Realtime Report with Wrong Data", () => {
  const buf = Buffer.from(
    "232302FE4C575843443545343148443630303530380102B012051D090B100101030100570004C56818F326C352010E319400000201010052526C4E206E18F326C30500073BC62801DCE2CB0601250D0C011D0CDA01602B01602B0700000000000000000008010118F326C300C00001C00CF40CED0CF00CF60CEF0CF30CFA0CF40CF60CFA0CF40CF70CFD0CF80CFA0CFD0CF80CFA0CFD0CF80CFA0CFE0CF80CFB0CFF0CF90CFC0CE20CDA0CDE0CED0CE60CE90D0C0D070D090D0C0D070D090D080D030D050D080D030D050D000CFA0CFC0CFD0CF70CFA0CEE0CE70CEA0CEA0CE30CE60CE60CDF0CE20CE60CDF0CE20CE20CDB0CDE0CF60CEF0CF20D060D010D030CFE0CF80CFA0D030CFD0CFF0D030CFD0CFF0CFE0CF80CFB0CFE0CF80CFA0CF50CEF0CF10CF80CF10CF40CF40CED0CF00CF10CF00CEF0CF30CF10CF10CF80CF50CF50CF80CF60CF60CFB0CF90CF90CFC0CF90CFA0CFC0CF90CFA0CFD0CFB0CFB0CFD0CFB0CFB0CDE0CDC0CDC0CEA0CE80CE80D0B0D090D080D0B0D090D090D060D050D050D060D050D050CFE0CFC0CFC0CFB0CF90CF90CEB0CE90CE90CE60CE50CE50CE30CE10CE10CE30CE10CE10CDF0CDD0CDE0CF30CF10CF10D050D020D020CFB0CF90CFA0D000CFE0CFF0D000CFE0CFF0CFC0CFA0CFA0CFB0CF90CF90CF20CF10CF10CF50CF30CF30CF10CF00CEF09010100602B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B80001000000000000000000000000000000000810007C2C23430205000820005000000000083001CFA0DAC09C431942EEA18F30000000046F0000040A600001A1F000088840008280028223FF352018500082710271027105100870004000035358C00060000000000008D00060000207E000BF6",
    "hex"
  );

  const result = protocol.parse(buf);
  expect(result.err).toEqual(new Error("custome ext section has wrong lenth 16"));
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

it("10 Seconds", () => {
  const buf = Buffer.from(
    "232303FE4C5758435332303137313130373030303001006B1206150D312F810100020003000004271001000200030000042710010002000300000427100100020003000004271001000200030000042710010002000300000427100100020003000004271001000200030000042710010002000300000427100100020003000004271054",
    "hex"
  );
  const req = protocol.parse(buf);
  expect(req.length).toBe(107);
  expect(req).toEqual({
    command: "REISSUE_REPORT",
    flag: "COMMAND",
    vin: "LWXCS201711070000",
    encrypt: "NONE",
    length: 107,
    body: {
      at: new Date("2018-06-21T05:49:47.000Z"),
      items: [
        {
          type: "TEN_SECONDS",
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
        },
      ],
    },
  });
});

it("Response Heart Beat", () => {
  const buf = Buffer.from("232307FE4838323230363530303030303030303030010000BB", "hex");
  const req = protocol.parse(buf);
  const resBuf = protocol.respond(req, buf);
  expect(protocol.shouldRespond(req)).toBe(true);
  expect(resBuf.toString("hex")).toEqual("23230701483832323036353030303030303030303001000044");
});

it("Response Time Check", () => {
  const buf = Buffer.from("232308FE4552523038303330303030303030303030010000B9", "hex");
  const req = protocol.parse(buf);
  const resBuf = protocol.respond(req, buf);
  expect(protocol.shouldRespond(req)).toBe(true);
  expect(resBuf.toString("hex")).toMatch(/232308014552523038303330303030303030303030010006/);
});

it("Should deSticky successfully", () => {
  const buf = Buffer.from(
    "232303fe4c53464430333230584a4330303136303301006b120b0809072081011902ff0300c8042db6010002ff0300d2042db6013502ff0300e6042db6013002ff0300f0042db6010602ff0300fa042db6010002ff0300fa042db6010002ff0300fa042db6010002ff0300e6042db6010002ff0300dc0426dc010002ff0300c80426dc7e232302fe4c53464430333230584a4330303136303301020c120b080907210101030100c8000311e6171b2db64d012e196419ff020101014d58d054746417082a620500073d088101dbcf8a0601680cf801eb0cd0011a4101233907000000000000000000080101171b2db6016800c9a00cf80cf80cf80ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40cf80ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40cd00ce40ce40ce40cf80ce40cf80ce40ce40ce40cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40ce40cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80ce40ce40ce40ce40ce40ce40ce40cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80ce40ce40ce40ce40ce40ce40ce40cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf80cf8090101003c3a3c3d3c3b3c3b3c3d3c3b3c3a3b3c3b3a3b3a3b3c3b393a404140403f3f",
    "hex"
  );

  const next = protocol.deSticky(buf);
  const result = protocol.parse(buf);
  expect(next.length).toBe(467);
  expect(result.command).toBe(cs.COMMAND.REISSUE_REPORT);
});
