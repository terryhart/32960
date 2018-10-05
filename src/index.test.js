import Protocol from "./index";

it("Login", () => {
  const buf = Buffer.from(
    "232301fe4C46574144524A463031313030323334360100281206050B2C1D00013833363035333337393831363035343930313837020531303030313130303032C2",
    "hex"
  );
  const p = new Protocol(buf);
  expect(p.length).toBe(40);
  expect(p.data).toEqual({
    subSysSn: ["10001", "10002"],
    at: new Date("2018-06-05T11:44:29+08:00"),
    command: "01",
    dataLength: 40,
    encrypt: "01",
    flag: "fe",
    sn: 1,
    iccid: "83605337981605490187",
    subSysNm: 2,
    subSysNmLen: 5,
    vin: "LFWADRJF011002346",
  });
});

it("response heart beat", () => {
  const buf = Buffer.from("232307FE4838323230363530303030303030303030010000BB", "hex");
  const p = new Protocol(buf);
  expect(p.respond().toString("hex")).toEqual("23230701483832323036353030303030303030303001000044");
});

it("response time check", () => {
  const buf = Buffer.from("232308FE4552523038303330303030303030303030010000B9", "hex");
  const p = new Protocol(buf);
  expect(p.respond().toString("hex")).toMatch(/232308014552523038303330303030303030303030010006/);
});
