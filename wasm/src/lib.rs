use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn collatz_steps(mut n: u64) -> u64 {
    assert!(n > 0, "Input must be a positive integer");

    let mut counter = 0;
    while n != 1 {
        if n % 2 == 0 {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
        counter += 1;
    }
    counter
}
