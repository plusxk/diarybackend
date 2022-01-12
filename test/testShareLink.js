const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

let encryptedPath;
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

//test encrypted
describe("test encrypted",  () => {

    it("should respond a encrypted path, having status 200", function(done) {
        request
        .get('/shareLink/genewang7@gmail.com/Uncategorized/mydiary')
        .set('authorization', token)
        .expect(200) // status must be 200
        .end(function(err, res){
            encryptedPath = res.body.encryptedPath;
            should.not.exist(err);
            should(res.body).have.property('token');
            should(res.body).have.property('encryptedPath');
            done();
        })
    })
    
});

//test decrypted
describe("test decrypted",  () => {

    it("should respond a diary, having status 200", function(done) {
        request
        .get('/shareLink/' + encryptedPath)
        .expect(200) // status must be 200
        .end(function(err, res){
            //console.log(res.body);
            should.not.exist(err);
            should(res.body).be.a.Object();
            done();
        })
    })
    
});
