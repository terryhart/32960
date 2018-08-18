export default class Base {
  constructor() {
    this.buffer = null;
    this.result = null;
    this.len = null;
    this.offset = 0;
  }

  sliceBuffer(start) {
    this.buffer = this.buffer.slice(start);
  }

  parse(buffer) {
    this.buffer = buffer;
    const res = this.parser.decompress(this.buffer, true);
    ({ result: this.result, length: this.len } = res);
    this.filter();
    return this.result;
  }

  filter() {
    return;
  }
}
