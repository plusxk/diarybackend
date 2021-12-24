const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

let token;


describe("test verify",  () => {

    it("should have status 401", function(done) {

        request
        .post('/checkLogin')
        .set('Content-Type', 'application/json')
        .set('authorization', "123456")
        .expect(401) // status must be 200
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
});

//test login
describe("test login",  () => {

    it("should respond a message indicating that the account has not been activated, having status 403", function(done) {
        let user = {
            email: "dairyprojecttest@gmail.com",
            password: "123456"
        }
        request
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(403) // status must be 403
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })

    it("should respond a message indicating that the password is incorrect, having status 401", function(done) {
        let user = {
            email: "genewang7@gmail.com",
            password: "tttttt"
        }
        request
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(401) // status must be 401
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })

    it("should respond a token, having status 200", function(done) {
        let user = {
            email: "genewang7@gmail.com",
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
            should(res.body).have.property('token');
            should(res.body).have.property('email');
            done();
        })
    })
    
});
