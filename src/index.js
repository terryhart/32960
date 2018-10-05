import packet from "./packet";

function bcc(buf) {
  let bcc = 0;
  // 校验从命令单元的第一个字节开始, 至倒数第二个字节结束
  for (let i = 2; i < buf.length - 1; i++) {
    bcc ^= buf[i];
  }
  return bcc;
}

export default class Protocol {
  __data;
  __buffer;

  get data() {
    return this.__data;
  }

  get buffer() {
    return this.__buffer;
  }

  get length() {
    return this.__buffer.readUInt16BE(22);
  }

  get err() {
    return this.__err;
  }

  constructor(buf) {
    this.__buffer = buf;

    try {
      if (buf[0] !== 0x23 && buf[1] !== 0x23) {
        throw new Error("Packet not start with ##");
      }

      if (this.length + 25 > buf.length) {
        throw new Error("The length of data is not expected.");
      }

      if (bcc(buf) !== buf[buf.length - 1]) {
        throw new Error("XOR checksum error.");
      }

      this.__data = packet.decompress(buf);
    } catch (err) {
      this.__err = err;
      console.log(err);
    }
  }

  isSticky() {
    return this.length + 25 < this.buffer.length;
  }

  slice() {
    return this.buffer.this.slice(this.length + 25);
  }

  respond() {
    const size = this.length > 6 || this.data.command === "08" ? 31 : 25; // 如果大于 6 的话，一定包含时间字段
    const buf = Buffer.alloc(size, this.buffer);
    const result = this.err ? 2 : 1; // 1 成功 2 失败 3 VIN 重复 （VIN重复这个错误不知道怎么触发）
    buf.writeUInt8(result, 3);
    if (size === 31) buf.writeInt16BE(6, 22); // 如果包含时间, 则长度是 6

    // 校时 单独写入时间
    if (this.data.command === "08") {
      const now = new Date();
      buf.writeInt8(now.getFullYear() - 2000, 24);
      buf.writeInt8(now.getMonth() + 1, 25);
      buf.writeInt8(now.getDate(), 26);
      buf.writeInt8(now.getHours(), 27);
      buf.writeInt8(now.getMinutes(), 28);
      buf.writeInt8(now.getSeconds(), 29);
    }

    buf.writeUInt8(bcc(buf), buf.length - 1);
    return buf;
  }
}
