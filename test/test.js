var app = require('../server.js');
const request = require('supertest');
const assert = require('assert');


describe('GET /', function() {
  it('respond with html', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});