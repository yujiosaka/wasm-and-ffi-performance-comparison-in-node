# wasm-and-ffi-performance-comparison-in-node

This repository compares the performance between a Rust FFI and a Rust-compiled-to-WASM for the [Collatz conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture).

## Setup

1. Install Node.js dependencies:

   ```bash
   $ npm install
   ```

2. Install Rust and build the projects:

   ```bash
   # Build FFI
   $ cd ffi
   $ cargo build --release
   $ cd ..

   # Build WASM
   $ cd wasm
   $ wasm-pack build --target nodejs --release
   $ cd ..
   ```

3. Run benchmarks:

   ```bash
   $ node benchmark.js --input 670617279
   ```

## Results

After running the benchmarks, the results are as follows:

```bash
$ node benchmark.js -i 670617279
JS x 32,172 ops/sec ±0.17% (95 runs sampled)
FFI x 225,918 ops/sec ±2.44% (78 runs sampled)
WASM x 1,465,898 ops/sec ±0.15% (99 runs sampled)
Fastest is WASM
```

**Fastest Implementation: WASM**

WASM has shown significantly higher performance compared to both native JavaScript and Rust FFI. Here are some reasons why WASM outperforms FFI:

1. **Optimized for Performance**: WASM is designed for efficient execution and compact representation on modern web browsers and platforms, including Node.js. This allows WASM to execute at near-native speed, often outperforming JavaScript and sometimes even optimized native code in specific scenarios.

2. **Reduced Overhead**: Calling Rust functions via FFI introduces overhead due to the need to cross the boundary between JavaScript and native code. Each FFI call involves marshalling data between JavaScript and Rust, which can significantly affect performance when functions are called frequently.

3. **Direct Compilation Advantages**: WASM is compiled directly from Rust using `wasm-pack`, optimizing both the size and the execution speed of the resulting module. In contrast, Rust FFI requires dynamic linking and runtime resolution of symbols, which adds runtime overhead.

4. **Better Inline Optimization**: Compilers for WASM can make more aggressive optimizations during the compilation process, as they have a more comprehensive view of the codebase at compile time. This can lead to better performance as compared to dynamically loaded libraries via FFI.

5. **Memory Management**: WASM operates within a sandboxed environment with a linear memory model, which simplifies some aspects of memory management and security, potentially reducing overheads compared to FFI, where managing memory across language boundaries is more complex and error-prone.

## Conclusion

These benchmarks indicate that WASM can provide significant performance improvements for computational tasks in Node.js, making it a compelling choice for performance-critical applications.
