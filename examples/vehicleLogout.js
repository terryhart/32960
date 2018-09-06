import Protocol from "../src";

const buf = Buffer.from(
  "232304FE4C5A595441474257394A313030343136340100081206161015150046EA",
  "hex"
);
const vehicleLogout = new Protocol(buf);
console.log(vehicleLogout.toJSON);
