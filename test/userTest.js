const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

describe('User Controller Test', () => {
    describe('GET/ get all users', () => {
        it('should respond an array, have status 500', function(done) {
            request
            .get('/user')
            .expect(500)
            .end((err, res) => {
                should.not.exist(err);
                should(res.body.user).be.a.Array();
                done();
            })
        });
    })
    describe('GET/ get a user by email', () => {
        it('should respond an object, have status 500', function(done) {
            this.timeout("5000");

            request
            .get('/user/genewang7@gmail.com')
            .expect(500)
            .end(function (err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();
                should(res.body).have.property('_id');
                should(res.body).have.property('email');
                should(res.body).have.property('password');
                should(res.body).have.property('code');
                should(res.body).have.property('isAdmin');
                should(res.body).have.property('isActivated');
                should(res.body).have.property('folder');
                done();
            })
        });
    })
});