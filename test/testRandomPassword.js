const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

let token;

//test random password
describe("test random password",  () => {

    // test enter wrong email
    it("should have status 404", function(done) {
        this.timeout("5000");
        let user = {
            email: "genewang8@gmail.com",
        }
        request
        .post('/randomPassword')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(404)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })

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


// test set password
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

