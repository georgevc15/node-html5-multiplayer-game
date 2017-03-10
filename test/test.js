const app = require('../server.js');
const request = require('supertest');

const chai = require('chai'),
      mocha = require('mocha'),
      should = chai.should();

const io = require('socket.io-client');


//test io
describe("new player", function () {

    var server,
        options = {
            transports: ['websocket'],
            'force new connection': true
        };

    beforeEach(function (done) {
        // start the server
        server = app;

        done();
    });


    afterEach(function(done) {
        // Cleanup
         var client = io.connect("http://localhost:5000", options);        
        if(client.connected) {
            console.log('disconnecting...');
            client.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });


    it("connects a new player", function (done) {
          var client = io.connect("http://localhost:5000", options);

          client.once("connect", function () {
              client.once("new player", function (message) {
                  var obj = message[0];
                  //console.log(obj);
                  
                  message.should.equal("New player connected!");
                  
                  client.disconnect();
                  done();
              });

              client.emit("new player", "New player connected!");
          });
      });



});


//test server
describe('GET /', function() {
  it('respond with html', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});


describe('test', function() {
  it('should be 25', function() {
    //expect(app.multifn(5,5)).toBe(25);
     should.equal( 25, app.multifn(5,5), "String '1' and number 1 have the same value" );
  });
});