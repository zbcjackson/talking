var request = require('supertest');

describe('authController', function() {

  describe('#listen()', function() {
    it('should redirect to /mypage', function (done) {
      request(sails.hooks.http.app)
        .post('/users/login')
        .send({ name: 'test', password: 'test' })
        .expect(302)
        .expect('location','/mypage', done);
    });
  });

});