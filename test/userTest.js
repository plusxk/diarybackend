const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

let token;

//login
before("login",  () => {

    it("should respond a token, having 200", function(done) {
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

describe('User Controller Test', () => {
    describe('GET/ get all users', () => {
        it('should respond an array, have status 200', function(done) {
            request
            .get('/user')
            .set('authorization', token)
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                should(res.body).have.property('token');
                should(res.body.user).be.a.Array();
                done();
            })
        });
    })
    describe('GET/ get a user by email', () => {
        it('should respond an object, have status 200', function(done) {
            this.timeout("5000");

            request
            .get('/user/genewang7@gmail.com')
            .set('authorization', token)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                should(res.body.user).have.property('_id');
                should(res.body.user).have.property('email');
                should(res.body.user).have.property('password');
                should(res.body.user).have.property('code');
                should(res.body.user).have.property('isAdmin');
                should(res.body.user).have.property('isActivated');
                should(res.body.user).have.property('folder');
                done();
            })
        });
    })
});