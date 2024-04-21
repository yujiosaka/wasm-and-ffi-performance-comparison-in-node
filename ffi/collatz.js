const ffi = require("ffi-napi");
const path = require("path");

const lib = ffi.Library(path.join(__dirname, "./target/release/libffi"), {
  collatz_steps: ["int64", ["int64"]],
});

function collatzSteps(n) {
  return lib.collatz_steps(n);
}

module.exports = { collatzSteps };
