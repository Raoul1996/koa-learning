const supertest = require('supertest')
const chai = require('chai')
const app = require('../index')
const expect = chai.expect
const request = supertest(app.listen())

//测试套件/组
describe('start test the GET request', () => {
  // test example
  it('test /getString.json request', (done) => {
    request.get('/getString.json').expect(200).end((err, res) => {
      // test the type of response
      expect(res.body).to.be.an('object')
      expect(res.body.success).to.be.an('boolean')
      expect(res.body.data).to.be.an('string')
      done()
    })
  })
  it('test /getNumber.json request', (done) => {
    request.get('/getNumber.json').expect(200).end((err, res) => {
      // test the type of response
      expect(res.body).to.be.an('object')
      expect(res.body.success).to.be.an('boolean')
      expect(res.body.data).to.be.an('number')
      done()
    })
  })
})