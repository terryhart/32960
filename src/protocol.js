import parser from "./parser";
import * as cs from "./constants";

export default class Protocol {
  HEADER_LENGTH = 24;
  MAX_LENGTH = 65531; // 60KB

  constructor(encrypt = false) {
    this.encrypt = encrypt;
  }

  /**
   * 计算 BCC 校验值
   *
   * @param {Buffer} buf 二进制数据包
   */
  bcc(buf) {
    let bcc = 0;
    // 校验从命令单元的第一个字节开始, 至倒数第二个字节结束
    for (let i = 2; i < this.len(buf) - 1; i++) {
      bcc ^= buf[i];
    }
    return bcc;
  }

  /**
   * 获取数据包中的数据单元长度
   *
   * @param {Buffer} buf 二进制数据包
   */
  len(buf) {
    return buf.readUInt16BE(22) + 25;
  }

  /**
   * 解析二进制数据包
   *
   * @param {Buffer} buf 二进制数据包
   * @returns {object} 返回 json
   */
  parse(buf) {
    if (!this.isValid(buf)) throw new Error("Invalid packet");
    return parser.decompress(buf);
  }

  /**
   * 检查头部是否正确
   *
   * @param {Buffer} buf 二进制数据包
   */
  isValidHeader(buf) {
    return (
      buf[0] === 0x23 &&
      buf[1] === 0x23 &&
      buf.length === this.HEADER_LENGTH &&
      this.len(buf) < this.MAX_LENGTH
    );
  }

  /**
   * 检查数据包格式是否正确
   *
   * @param {Buffer} buf 二进制数据包
   */
  isValid(buf) {
    const header = buf.slice(0, this.HEADER_LENGTH);
    return (
      this.isValidHeader(header) &&
      this.len(buf) === buf.length &&
      this.bcc(buf) === buf[this.len(buf) - 1]
    );
  }

  /**
   * 从 json 构造二进制 buffer
   */
  build() {
    throw new Error("not implemented");
  }

  /**
   * 判断是否要对请求做出应答
   *
   * @param {Packet} req 解析后的请求
   */
  shouldRespond(req) {
    const cc = [
      cs.COMMAND.VEHICLE_LOGIN, // 车辆登入 0x01
      cs.COMMAND.VEHICLE_LOGOUT, // 车辆登出 0x04
      cs.COMMAND.PLATFORM_LOGIN, // 平台登入0x05
      cs.COMMAND.PLATFORM_LOGOUT, // 平台登出0x06
      cs.COMMAND.HEARTBEAT, // 心跳 0x07
      cs.COMMAND.TIME, // 车辆校时 0x08
    ];
    if (cc.includes(req.command)) return true;
    if (req.flag === cs.FLAG.COMMAND) return true;
    return false;
  }

  /**
   * 构造成功应答
   *
   * @param {Packet} req 解析后的请求数据
   * @param {Buffer} origin 原始二进制包
   * @returns {Buffer} 应答包
   */
  respond(req, origin) {
    // 由于 telegram 还不支持 build buf
    // 临时直接构造一个 用于应答的包
    const size = req.command === cs.COMMAND.HEARTBEAT ? 25 : 31; // 心跳包的回复不包含时间
    const buf = Buffer.alloc(size, origin);
    buf.writeUInt8(1, 3); // 1 成功标志
    buf.writeInt16BE(size - 25, 22); // 如果包含时间, 则数据长度是 6

    // 校时 单独写入时间
    if (req.command === cs.COMMAND.TIME) {
      const now = new Date();
      buf.writeInt8(now.getFullYear() - 2000, 24);
      buf.writeInt8(now.getMonth() + 1, 25);
      buf.writeInt8(now.getDate(), 26);
      buf.writeInt8(now.getHours(), 27);
      buf.writeInt8(now.getMinutes(), 28);
      buf.writeInt8(now.getSeconds(), 29);
    }

    buf.writeUInt8(this.bcc(buf), size - 1);
    return buf;
  }

  /**
   * 构造错误应答
   *
   * @param {Buffer} origin 原始二进制包
   * @returns {Buffer} 应答包
   */
  respondError(origin) {
    const size = 25;
    const buf = Buffer.alloc(size, origin);
    buf.writeUInt8(2, 3); // 2 解析失败标志
    buf.writeInt16BE(size - 25, 22);
    buf.writeUInt8(this.bcc(buf), size - 1);
    return buf;
  }
}
