const User = require('../model/userDBSchema');
const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

//test sign up
describe("test sign up", () => {

    it("should have status 201", function(done) {
        this.timeout("5000");
        let user = {
            email: "00857028@email.ntou.edu.tw",
            password: "tttttt"
        }
        request
        .post('/signUp')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(201)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
});

//verify after sign up
describe("test sign up", () => {
    
    var userCode = "";
    // get code
    it("should have status 200", function(done) {
        this.timeout("5000");

        request
        .get('/user/00857028@email.ntou.edu.tw')
        .expect(500)
        .end(function(err, res){
            userCode = res.body.code;
            should.not.exist(err);
            done();
        })
    })
    
    it("should have status 201", function(done) {
        this.timeout("5000");
        let user = {
            email: "00857028@email.ntou.edu.tw",
            code: userCode
        }
        request
        .post('/verify')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(201)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
});


//delete after create user
describe("test delete user", () => {

    it("should have status 200", function(done) {
        this.timeout("5000");
        request
        .delete('/user/00857028@email.ntou.edu.tw')
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
});


