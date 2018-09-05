import Protocol from "../src";

const buf = Buffer.from(
  "232301FE4C5A59545547455735473130353935343501001E12061610150F001F38393836303631363032303034363337393632390100A8",
  "hex"
);
const vehicleLogin = new Protocol(buf);
console.log(vehicleLogin.toJSON);
