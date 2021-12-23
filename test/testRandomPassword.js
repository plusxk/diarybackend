const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

let token;

//test random password
describe("test random password",  () => {

    it("should have status 250", function(done) {
        this.timeout("5000");
        let user = {
            email: "genewang7@gmail.com",
        }
        request
        .post('/randomPassword')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(250)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
    
});

describe("test reset password => ssssss",  () => {

    it("should have status 201", function(done) {
        this.timeout("5000");
        let user = {
            email: "genewang7@gmail.com",
            newPassword: "ssssss"
        }
        request
        .post('/setPassword')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(201)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
    
});

