let server = require('../server')
let chai = require('chai')
let chaiHttp = require('chai-http')
let expect = chai.expect
chai.use(chaiHttp)
let loginDetails = {
  'username': 'testPwan',
  'password': '123456'
}
describe(' Test Login ', () => {
  it('Login, and check token', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          console.log('err', err)
        }
        expect(res.body).to.have.property('token')
        done()
      })
  })
})
