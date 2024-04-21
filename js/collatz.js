function collatzSteps(n) {
  let counter = 0;
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error("Input must be a positive integer");
  }
  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = n * 3 + 1;
    }
    counter++;
  }
  return counter;
}

module.exports = { collatzSteps };
