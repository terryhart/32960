import Protocol from "./protocol.js";

const buf = Buffer.from(
  "232301FE4C5A59545547455735473130353935343501001E12061610150F001F38393836303631363032303034363337393632390100A8",
  "hex"
);
const vehicleLogin = new Protocol();

test("Parse vehicleLogin data package.", () => {
  expect(vehicleLogin.parse(buf)).toEqual({
    commandIDHex: "01",
    vin: "LZYTUGEW5G1059545",
    subSysSn: [],
    loginAt: "2018-06-22T16:21:15+08:00",
    sn: 31,
    iccid: "89860616020046379629",
    subSysNm: 1,
    subSysNmLen: 0
  });
});
