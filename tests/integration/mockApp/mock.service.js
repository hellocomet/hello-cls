async function randomWait (min = 500) {
  const timeout = (Math.random() * 500) + min
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

module.exports = {
  randomWait
}
