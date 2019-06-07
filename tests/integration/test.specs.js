/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const axios = require('axios')
const uuid = require('uuid/v4')
const { expect } = require('chai')

describe('CLS', () => {
  it(`should return a the request's unique id for more than one concurrents requests`, async () => {
    const max = 10
    const promises = []
    while (promises.length < max) {
      const id = uuid()
      const index = promises.length
      console.log(`[${index}]: ${id} - sent`)
      promises.push(
        axios
          .get(`http://127.0.0.1:3000/test/${id}`)
          .then(({ data }) => {
            console.log(`[${index}]: ${id} - received`)
            expect(data).to.equal(`🍪.${id}`)
          })
      )
    }
    await Promise.all(promises)
  })
})
