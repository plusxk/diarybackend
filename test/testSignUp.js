const User = require('../model/userDBSchema');
const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);


let userCode;

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
            userCode = res.body.content;
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

let token;

//delete after create user
describe("test delete user", () => {


    beforeEach("should respond a token, having 200", function(done) {
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

    it("should have status 204", function(done) {
        this.timeout("5000");
        request
        .delete('/user/diaryproject1234@gmail.com')
        .set('authorization', token)
        .expect(204)
        .end(function(err, res){
            should.not.exist(err);
            done();
        })
    })
});