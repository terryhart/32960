export default [
  {
    name: "Login",
    input:
      "232301fe4C46574144524A463031313030323334360100281206050B2C1D00013833363035333337393831363035343930313837020531303030313130303032C2",
    expect: {
      req: {
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
      },
    },
  },
  {
    name: "Response Login",
    input:
      "232301FE4C464E41344C4441394A4B4C303030383101001F120A1E10240000033839383631363136303230303134313030303032010131DF",
    expect: {
      shouldRespond: true,
      resBuf: "232301014c464e41344c4441394a4b4c3030303831010006120a1e10240000",
    },
  },
];
