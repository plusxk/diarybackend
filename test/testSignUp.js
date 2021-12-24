const User = require('../model/userDBSchema');
const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

//test sign up
describe("test sign up", () => {

    it("should have status 250", function(done) {
        this.timeout("5000");
        let user = {
            email: "diaryproject1234@gmail.com",
            password: "tttttt"
        }
        request
        .post('/signUp')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(250)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })

    it("should respond a message indicating that user post a duplicate email, having status code 409", function(done) {
        this.timeout("5000");
        let user = {
            email: "diaryproject1234@gmail.com",
            password: "tttttt"
        }
        request
        .post('/signUp')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(409)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })

});

var userCode = "";

//verify after sign up
describe("get code", () => {
    
    // get code
    it("should respond a code, having status 200", function(done) {
        this.timeout("5000");

        request
        .get('/user/diaryproject1234@gmail.com')
        .expect(200)
        .end(function(err, res){
            userCode = res.body.code;
            should.not.exist(err);
            done();
        })
    })
});

//verify after sign up
describe("test verify", () => {
    

    // test entering wrong code
    it("should have status 401", function(done) {
        this.timeout("5000");
        let user = {
            email: "diaryproject1234@gmail.com",
            code: ""
        }
        request
        .post('/verify')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(401)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })

    //test entering correct code
    it("should have status 204", function(done) {
        this.timeout("5000");
        let user = {
            email: "diaryproject1234@gmail.com",
            code: userCode
        }
        request
        .post('/verify')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(204)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
});


//delete after create user
describe("test delete user", () => {

    it("should have status 204", function(done) {
        this.timeout("5000");
        request
        .delete('/user/diaryproject1234@gmail.com')
        .expect(204)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
});