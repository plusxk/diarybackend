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

// test file upload
describe('test file upload', function() {
    it('should have status 201', function(done) {
        this.timeout("100000");
        request
        .post('/fileUpload')
        .set('authorization', token)
        .field('extra_info', '{"in":"case you want to send json along with your file"}')
        .attach('myfile', './IU.jpg')
        .expect(201)
        .end(function(err, res) {
            should.not.exist(err);
            done();
        });
    });
});