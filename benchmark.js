const assert = require("node:assert");
const Benchmark = require("benchmark");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { collatzSteps: collatzJs } = require("./js/collatz");
const { collatzSteps: collatzFfi } = require("./ffi/collatz");
const { collatzSteps: collatzWasm } = require("./wasm/collatz");

const argv = yargs(hideBin(process.argv))
  .option("input", {
    alias: "i",
    describe: "Input number for the Collatz conjecture",
    type: "number",
    demandOption: true,
    nargs: 1,
  })
  .check((argv) => {
    if (!Number.isInteger(argv.input) || argv.input <= 0) {
      throw new Error("Input must be a positive integer");
    }
    return true;
  }).argv;

const { input } = argv;
const stepsJs = collatzJs(input);

const stepsFfi = collatzFfi(input);
assert.equal(stepsJs, stepsFfi);

const stepsWasm = collatzWasm(input);
assert.equal(stepsJs, stepsWasm);

const suite = new Benchmark.Suite();
suite
  .add("JS", function () {
    collatzJs(input);
  })
  .add("FFI", function () {
    collatzFfi(input);
  })
  .add("WASM", function () {
    collatzWasm(input);
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
