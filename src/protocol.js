import parser from "./parsers";

export default class Protocol32960 {
  constructor(buffer) {
    this.buffer = buffer;
    this.result = this.parse();
  }

  checkData() {
    this.checkLength();
    this.checkXOR();
  }

  checkXOR() {
    let bytes = [];
    let i = 2; // 校验从命令单元的第一个字节开始
    for (i; i < this.buffer.length - 1; i++) {
      const tmp = this.buffer.readUInt8(i);
      bytes.push(tmp);
    }
    const sum = this.buffer.readUInt8(i);
    const reducer = (accumulator, currentValue) => accumulator ^ currentValue;
    if (bytes.reduce(reducer) !== sum) {
      throw new Error("Checksum error.");
    }
  }

  checkLength() {
    const totalLength = this.buffer.readUInt16BE(22);
    if (totalLength !== this.buffer.length - 25) {
      throw new Error("The length of data is not expected.");
    }
  }

  parse() {
    this.checkData();
    const content = new parser(this.buffer);
    return content.toJSON;
  }

  get toJSON() {
    return this.result;
  }
}
