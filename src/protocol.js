import packages from "./parsers";

export default class Protocol32960 {
  constructor() {
    this.buffer = null;
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

  sliceBuffer(start) {
    this.buffer = this.buffer.slice(start);
  }

  getCommandId() {
    return this.headerResult.commandIDHex;
  }

  parse(buffer) {
    this.buffer = buffer;
    this.checkData();
    this.parseHeader();
    const id = this.getCommandId();
    this.parseBody(id);
    return { ...this.headerResult, ...this.bodyResult };
  }

  parseHeader() {
    const header = new packages.basicInfo();
    this.headerResult = header.parse(this.buffer);
    this.sliceBuffer(header.len);
  }

  parseBody(symbol) {
    const body = new packages[symbol]();
    this.bodyResult = body.parse(this.buffer);
    this.sliceBuffer(body.len);
  }
}
