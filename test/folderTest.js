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

describe('Folder Controller Test', () => {
    describe('GET/ get all folders in a user', () => {
        it('should respond an array, have status 200', function(done) {
            request
            .get('/user/genewang7@gmail.com/folder')
            .set('authorization', token)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                should(res.body).have.property('folder');
                done();
            })
        })
    });

    describe('GET / get a folder in a user by folderName', () => {
        it('should respond an object, have status 200', function(done) {
            request
            .get('/user/genewang7@gmail.com/Uncategorized')
            .set('authorization', token)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                should(res.body).have.property('folder');
                done();
            })
        })
    })

    describe('POST / post a folder in a user', () => {
        it('should respond an object, have status 201', function(done) {
            const folderA = {
                folderName: 'Thisismyfolder',
                diary: []
            }
            
            request
            .post('/user/genewang7@gmail.com/folder')
            .set('authorization', token)
            .send(folderA)
            .expect(201)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                done();
            })
        })

        it('should respond a message indicating that user post a duplicate folder name, having status code 409', function(done) {
            const folderA = {
                folderName: 'Thisismyfolder'
            }
            
            request
            .post('/user/genewang7@gmail.com/folder')
            .set('authorization', token)
            .send(folderA)
            .expect(409)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                should(res.body).have.property('msg');
                done();
            })
        })
    })

    describe('PUT / put a folder in a user by folderName', () => {
        it('should respond an object, have status 201', function(done) {
            const folderA = {
                folderName: 'THISISMYFOLDER'
            }
            
            request
            .put('/user/genewang7@gmail.com/Thisismyfolder')
            .set('authorization', token)
            .send(folderA)
            .expect(201)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                done();
            })
        })

        it('should respond a message indicating that user post a duplicate folder name, having status code 409', function(done) {
            const folderA = {
                folderName: 'MYFOLDER'
            }
            
            request
            .put('/user/genewang7@gmail.com/THISISMYFOLDER')
            .set('authorization', token)
            .send(folderA)
            .expect(409)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                should(res.body).have.property('msg');
                done();
            })
        })
    })

    describe('DELETE / delete a folder in a user by folderName', () => {
        it('should respond an object, have status 204', function(done) {
            request
            .delete('/user/genewang7@gmail.com/THISISMYFOLDER')
            .set('authorization', token)
            .expect(201)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                done();
            })
        })
    })
    
    describe('GET / get all favored diaries', () => {
        it('should respond an array, having status 200', function(done) {

            request
            .get('/isFavored/genewang7@gmail.com')
            .set('authorization', token)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                should(res.body).have.property('diaryArray');
                done();
            })
        })
    })

    describe('PUT / modify isFavored current status', () => {
        it('should respond an object, having status 201', function(done) {
            const diaryA = {
                diaryTitle: 'mydiary'
            }

            request
            .put('/isFavored/genewang7@gmail.com/Uncategorized')
            .set('authorization', token)
            .send(diaryA)
            .expect(201)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                done();
            })
        })
    })

});