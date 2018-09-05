import Protocol from "./protocol.js";

// vehical login
const buf = Buffer.from(
  "232301FE4C5A59545547455735473130353935343501001E12061610150F001F38393836303631363032303034363337393632390100A8",
  "hex"
);
const vehicleLogin = new Protocol(buf);

test("Parse vehicleLogin data package.", () => {
  expect(vehicleLogin.toJSON).toEqual({
    commandIDHex: "01",
    vin: "LZYTUGEW5G1059545",
    subSysSn: [],
    loginAt: "2018-06-22T16:21:15+08:00",
    sn: 31,
    iccid: "89860616020046379629",
    subSysNm: 1,
    subSysNmLen: 0,
  });
});

//vehicle logout
const buf2 = Buffer.from(
  "232304FE4C5A595441474257394A313030343136340100081206161015150046EA",
  "hex"
);

const vehicleLogout = new Protocol(buf2);

test("Parse vehicleLogout data package.", () => {
  expect(vehicleLogout.toJSON).toEqual({
    commandIDHex: "04",
    vin: "LZYTAGBW9J1004164",
    logoutAt: "2018-06-22T16:21:21+08:00",
    sn: 70,
  });
});
