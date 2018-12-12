export default [
  {
    name: "Response Heart Beat",
    input: "232307FE4838323230363530303030303030303030010000BB",
    expect: {
      shouldRespond: true,
      resBuf: "23230701483832323036353030303030303030303001000044",
    },
  },
];
