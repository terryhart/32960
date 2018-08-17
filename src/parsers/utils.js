import Telegram from "telegram";

const assertFn = {
  range: (low, high, exceptVals = []) => {
    return num => {
      if (typeof num === "string") {
        num = parseInt(num, 10);
      }
      if (exceptVals.includes(num)) {
        return true;
      } else {
        return num >= low && num <= high;
      }
    };
  },

  xrange: (low, high, leftEqual = true, rightEqual = true) => {
    return num => {
      if (typeof num === "string") {
        num = parseInt(num, 10);
      }
      if (leftEqual && rightEqual) {
        return num >= low && num <= high;
      } else if (leftEqual && !rightEqual) {
        return num >= low && num < high;
      } else if (!leftEqual && rightEqual) {
        return num > low && num <= high;
      } else {
        return num > low && num < high;
      }
    };
  },
};

const formatterFn = {
  formatDigit: num => {
    if (num < 10 && num >= 0) {
      return `0${num}`;
    }
    return num.toString();
  },

  formatTime: ({ year, MM, dd, HH, mm, ss }) =>
    `${year + 2000}-${MM}-${dd}T${HH}:${mm}:${ss}+08:00`,

  genOpt: (res = 1, offset = 0, abnormal = 0xfe, invalid = 0xff) => {
    return val => {
      switch (val) {
        case abnormal:
          return "ABNORMAL"; // 0xFE 异常
        case invalid:
          return "INVALID"; // 0xFF 无效
        default:
          return (val + offset) * res;
      }
    };
  },
};

const timeParser = new Telegram()
  .endianess("big")
  .uint8("year", { assert: assertFn.range(0, 99) })
  .uint8("MM", { formatter: formatterFn.formatDigit, assert: assertFn.range(1, 12) })
  .uint8("dd", { formatter: formatterFn.formatDigit, assert: assertFn.range(1, 31) })
  .uint8("HH", { formatter: formatterFn.formatDigit, assert: assertFn.range(0, 23) })
  .uint8("mm", { formatter: formatterFn.formatDigit, assert: assertFn.range(0, 59) })
  .uint8("ss", { formatter: formatterFn.formatDigit, assert: assertFn.range(0, 59) });

export { assertFn, formatterFn, timeParser };
