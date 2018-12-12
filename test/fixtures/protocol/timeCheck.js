export default [
  {
    name: "Response Time Check",
    input: "232308FE4552523038303330303030303030303030010000B9",
    expect: {
      shouldRespond: true,
      resBuf: /232308014552523038303330303030303030303030010006/,
    },
  },
];
