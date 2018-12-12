export default [
  {
    name: "Vehicle Logout",
    input: "232304FE4C5A595441474257394A313030343136340100081206161015150046EA",
    expect: {
      req: {
        body: { at: new Date("2018-06-22T08:21:21.000Z"), sn: 70 },
        command: "VEHICLE_LOGOUT",
        encrypt: "NONE",
        flag: "COMMAND",
        length: 8,
        vin: "LZYTAGBW9J1004164",
      },
      shouldRespond: true,
      resBuf: "232304014c5a595441474257394a313030343136340100061206161015155d",
    },
  },
];
