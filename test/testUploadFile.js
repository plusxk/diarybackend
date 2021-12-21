const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

describe('upload', function() {
    it('a file', function(done) {
       request.post('/fileupload')
              .field('extra_info', '{"in":"case you want to send json along with your file"}')
              .attach('image', './IU.jpg')
              .expect(500)
              .end(function(err, res) {
              	  should.not.exist(err);
                  //res.should.have.status(201); // 'success' status
                  done();
              });
    });
});