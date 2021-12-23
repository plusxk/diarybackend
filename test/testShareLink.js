const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

let encryptedPath = '/shareLink/';

//test encrypted
describe("test encrypted",  () => {

    it("should have status 200", function(done) {
        request
        .get('/shareLink/genewang7@gmail.com/Uncategorized/mydiary')
        .expect(200) // status must be 200
        .end(function(err, res){
            encryptedPath += res.body.encryptedPath;
            should.not.exist(err);
            should(res.body).have.property('encryptedPath');
            done();
        })
    })
    
});

//test decrypted
describe("test decrypted",  () => {

    it("should have status 200", function(done) {
        request
        .get(encryptedPath)
        .expect(200) // status must be 200
        .end(function(err, res){
            //console.log(res.body);
            should.not.exist(err);
            should(res.body).be.a.Object();
            done();
        })
    })
    
});
