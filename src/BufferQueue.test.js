import { Buffer } from "buffer";
import BufferQueue from "./BufferQueue";

describe("#BufferQueue", () => {
  const queue = new BufferQueue();
  it("should push buffer", () => {
    const buf = Buffer.from("01020304050607080910", "hex");
    const buf2 = Buffer.from("01020304050607080910", "hex");
    queue.push(buf);
    expect(queue._buffers).toEqual([buf]);
    expect(queue._buffersLength).toBe(buf.length);
    queue.push(buf2);
    expect(queue._buffers).toEqual([buf, buf2]);
    expect(queue._buffersLength).toBe(buf.length + buf2.length);
  });

  it("should has enough buffer", () => {
    expect(queue.has(1)).toBe(true);
  });

  it("should not has enough buffer", () => {
    expect(queue.has(100)).toBe(false);
  });

  it("should get first one byte", () => {
    expect(queue.first(1).toString("hex")).toBe("01");
  });

  it("should shift one byte", () => {
    const buf = queue.shift(1);
    expect(buf.toString("hex")).toBe("01");
    expect(queue.length).toBe(19);
    expect(queue._buffers.length).toBe(2);
    expect(queue._buffers[0].toString("hex")).toBe("020304050607080910");
  });

  it("should shift entire first buffer", () => {
    const buf = queue.shift(9);
    expect(queue._buffers.length).toBe(1);
    expect(queue.length).toBe(10);
    expect(buf.toString("hex")).toBe("020304050607080910");
  });

  it("should concat and shift", () => {
    queue.push(Buffer.from("0102030405", "hex"));
    const buf = queue.shift(11);
    expect(queue._buffers[0].toString("hex")).toBe("02030405");
    expect(buf.toString("hex")).toBe("0102030405060708091001");
    expect(queue.length).toBe(4);
  });

  it("should shift all", () => {
    const buf = queue.shift(100);
    expect(queue.length).toBe(0);
    expect(buf.toString("hex")).toBe("02030405");
  });

  it("should drain", () => {
    queue.push(Buffer.from("0102030405", "hex"));
    expect(queue.drain().toString("hex")).toBe("0102030405");
    expect(queue.length).toBe(0);
  });

  it("should combine and get first", () => {
    queue.push(Buffer.from("0102030405", "hex"));
    queue.push(Buffer.from("0102030405", "hex"));
    expect(queue.first(6).toString("hex")).toBe("010203040501");
    expect(queue._buffers.length).toBe(1);
    expect(queue.drain().toString("hex")).toBe("01020304050102030405");
  });
});
