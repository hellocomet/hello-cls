async function randomWait () {
  const timeout = (Math.random() * 500) + 500
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

module.exports = {
  randomWait
}
