const express = require('express')
const app = express()
const { asyncLocalStorage } = require('./store')
const { mockModel } = require('./mock.model')

app.use((req, res, next) => {
  asyncLocalStorage.run({}, () => {
    next()
  })
})

app.get('/test/:id', async (req, res) => {
  const { params: { id } } = req
  const store = asyncLocalStorage.getStore()
  store.id = id
  res.send(await mockModel.get())
})

app.get('/test-event/:id', async (req, res) => {
  const { params: { id } } = req
  res.send(await mockModel.getWithEvent(id))
})

app.listen(3000, () => {
  console.log('listening')
})
