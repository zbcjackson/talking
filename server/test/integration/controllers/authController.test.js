var request = require('supertest');
var sinon = require("sinon")

describe('authController', function() {

  describe('#listen()', function() {
    it('Normal', function(done) {
      sinon.stub(ChatMessage, "watch", (req) =>{})

      request(sails.hooks.http.app)
        .get('/auth/listen')
        .send()
        .expect(200)
      done()
    });
  });
});