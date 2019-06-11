const { namespace } = require('../../../lib/cls')
const express = require('express')
const app = express()
const { mockModel } = require('./mock.model')

app.use((req, res, next) => {
  const context = namespace.initContext()

  res.once('finish', () => {
    context.close()
  })

  next()
})

app.get('/test/:id', async (req, res) => {
  const { params: { id } } = req
  namespace.set('id', id)
  res.send(await mockModel.get())
})

app.listen(3000, () => {
  console.log('listening')
})
