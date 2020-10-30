/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
/* eslint-disable semi */
/* eslint-disable func-names */

import chai from 'chai'
import chaihttp from 'chai-http'
import app from '../server.js'
import {generateToken} from '../newroute.js'

chai.use(chaihttp)

const user = { username: 'dummy', password: 'password' }
let token = generateToken(user)

/** assertion style */
chai.should()

// Before((done) => {
//   chai
//     .request(app)
//     .post('/api/login')
//     .send(user)
//     .end((err, res) => {
//       expect(res.status).to.equal(200)
//       token = res.body.token
//       done()
//     })
// })

describe('Api Tests', () => {
  /**
     * Test Get Api
     */
  describe('GET /api', () => {
    it('should print Welcome Jauth', (done) => {
      chai.request(app)
        .get('/api')
        .end((err, response) => {
          response.should.have.status(200)
        })
      done()
    })

    it('should not print Welcome Jauth', (done) => {
      chai.request(app)
        .get('/ap')
        .end((err, response) => {
          response.should.have.status(404)
        })
      done()
    })
  })

  /**
     * Test POST Api
     */

  describe('POST /api/login', () => {
    it('should get user data', (done) => {
      chai.request(app)
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body).to.have.property('token')
          done()
        })
      done()
    })

    it('should not get user data', (done) => {
      let user = {}
      chai.request(app)
        .post('/api/login')
        .end((err, response) => {
          response.should.have.status(404)
        })
      done()
    })
  })

  /**
     * Test /api/post Api
     */
  describe('/api/post', () => {
    it('should return 200', (done) => {
      chai.request(app)
        .post('/api/post')
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
        })
      done()
    })

    it('should not post json object', (done) => {
      chai.request(app)
        .get('/api/post')
        .end((err, response) => {
          response.should.have.status(404)
        })
      done()
    })
  })
  /**
     * Test home Api
     */
  /**
     * Test home Api
     */
})
