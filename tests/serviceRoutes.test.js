const expect = require('expect.js');
const request = require('supertest');

const {app} = require('../index');
const { populateRaces } = require('./seed/seed');

beforeEach(populateRaces);

describe('GET /api/get-race-list', () => {
  it('should fetch and save all races in the season', (done) => {
    request(app)
      .get('/api/get-race-list')
      .send({ user: {username: 'tom_aglow'}})
      .expect(200)
      .expect((res) => {
        expect(res.body.length).to.be(20);
      })
      .end(done);
  })
});