/**
 * BufferQueue 是一个可以读写的Buffer队列
 */
class BufferQueue {
  constructor() {
    this._buffers = [];
    this._buffersLength = 0;
  }

  /**
   * get first 'n' bytes
   * @param {Number} bytes
   * @return {Buffer}
   */
  first(bytes) {
    // If trying to shift more space than the internal buffer has, cap it
    // at the current size of the queue.
    bytes = bytes > this._buffersLength ? this._buffersLength : bytes;

    if (bytes <= 0) {
      return Buffer.alloc(0);
    }

    // 如果请求的字节数大于第一个Buffer的字节数，则把所有Buffer合并
    if (bytes > this._buffers[0].length) {
      this._combine();
    }

    // 如果请求的字节数等于第一个Buffer字节数，则直接把第一个Buffer取出来。减少内存操作。
    if (bytes === this._buffers[0].length) {
      return this._buffers[0];
    } else if (bytes < this._buffers[0].length) {
      return this._buffers[0].slice(0, bytes);
    }
  }

  /**
   * Removes the first `n` bytes out of the queue
   * and returns them. If `n` is greater than the current
   * buffer size, return as much as possible.
   *
   * @param {Number} bytes
   * @return {Buffer}
   */
  shift(bytes) {
    // If trying to shift more space than the internal buffer has, cap it
    // at the current size of the queue.
    bytes = bytes > this._buffersLength ? this._buffersLength : bytes;

    if (bytes <= 0) {
      return Buffer.alloc(0);
    }

    // 如果请求的字节数大于第一个Buffer的字节数，则把所有Buffer合并，取出bytes
    if (bytes > this._buffers[0].length) {
      const data = Buffer.concat(this._buffers, this._buffersLength);
      const front = data.slice(0, bytes);
      this.empty();
      this.push(data.slice(bytes));
      return front;
    }

    let res = null;

    // 如果请求的字节数等于第一个Buffer字节数，则直接把第一个Buffer取出来。减少内存操作。
    if (bytes === this._buffers[0].length) {
      res = this._buffers.shift();
    } else if (bytes < this._buffers[0].length) {
      res = this._buffers[0].slice(0, bytes);
      this._buffers[0] = this._buffers[0].slice(bytes);
    }

    this._buffersLength -= bytes;
    return res;
  }

  /**
   * Merges the buffer into the buffer queue.
   *
   * @param {Buffer} buffer
   */
  push(buffer) {
    this._buffers.push(buffer);
    this._buffersLength += buffer.length;
  }

  /**
   * 清空Buffer
   */
  empty() {
    this._buffers.length = 0;
    this._buffersLength = 0;
  }

  /**
   * 返回当前所有Buffer
   * @return {Buffer}
   */
  drain() {
    const data = Buffer.concat(this._buffers, this._buffersLength);
    this._buffers.length = this._buffersLength = 0;
    return data;
  }

  has(count) {
    return count <= this._buffersLength;
  }

  /**
   * Returns the size of all the queued buffers.
   */
  get length() {
    return this._buffersLength;
  }

  _combine() {
    const data = Buffer.concat(this._buffers, this._buffersLength);
    this.empty();
    this.push(data);
  }
}

export default BufferQueue;
