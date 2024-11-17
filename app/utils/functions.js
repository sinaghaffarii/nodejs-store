function RandomNumberGenerator() {
  return Math.floor(10000 + Math.random() * 90000);
}

module.exports = {
    RandomNumberGenerator,
};
