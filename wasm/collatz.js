const wasmPath = require.resolve("./pkg/wasm_bg.wasm");
const wasm = require("./pkg/wasm");

function collatzSteps(n) {
  return wasm.collatz_steps(BigInt(n));
}

module.exports = { collatzSteps };
