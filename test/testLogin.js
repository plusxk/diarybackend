const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

//test login
describe("test login",  () => {

    it("should have status 200", function(done) {
        let user = {
            userID: "testUsername",
            password: "ssssss"
        }
        request
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(200) // status must be 200
        .end(function(err, res){
            token = res.body.token;
            should.not.exist(err);
            done();
        })
    })
    
});

//test jwt
describe("test verify",  () => {

    it("should have status 200", function(done) {
        request
        .post('/verify')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .expect(200) // status must be 200
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
    
});
