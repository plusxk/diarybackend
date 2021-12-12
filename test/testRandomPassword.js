const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

//test random password
describe("test random password",  () => {

    it("should have status 200", function(done) {
        this.timeout("5000");
        let user = {
            userID: "1",
        }
        request
        .post('/randomPassword')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(201)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
    
});

describe("test reset password => ssssss",  () => {

    it("should have status 200", function(done) {
        this.timeout("5000");
        let user = {
            userID: "1",
            newPassword: "ssssss"
        }
        request
        .post('/setPassword')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
    
});

