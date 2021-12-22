const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

describe("test reset password ssssss => 123456",  () => {

    it("should have status 201", function(done) {
        this.timeout("5000");
        let user = {
            email: "genewang7@gmail.com",
            password: "ssssss",
            newPassword: "123456"
        }
        request
        .post('/resetPassword')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(201)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
    
});

describe("test reset password 123456 => ssssss",  () => {

    it("should have status 201", function(done) {
        this.timeout("5000");
        let user = {
            email: "genewang7@gmail.com",
            password: "123456",
            newPassword: "ssssss"
        }
        request
        .post('/resetPassword')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(201)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
    
});

