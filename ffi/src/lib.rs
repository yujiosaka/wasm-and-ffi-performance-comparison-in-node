#[no_mangle]
pub extern "C" fn collatz_steps(mut n: i64) -> i64 {
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
