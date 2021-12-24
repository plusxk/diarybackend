const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

describe('Folder Controller Test', () => {
    describe('GET/ get all folders in a user', () => {
        it('should respond an array, have status 200', function(done) {
            request
            .get('/user/genewang7@gmail.com/folder')
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Array();
                done();
            })
        })
    });

    describe('GET / get a folder in a user by folderName', () => {
        it('should respond an object, have status 200', function(done) {
            request
            .get('/user/genewang7@gmail.com/Uncategorized')
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();  
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
            .send(folderA)
            .expect(201)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body.log.folder).be.an.Array();
                done();
            })
        })

        it('should respond a message indicating that user post a duplicate folder name, having status code 409', function(done) {
            const folderA = {
                folderName: 'Thisismyfolder'
            }
            
            request
            .post('/user/genewang7@gmail.com/folder')
            .send(folderA)
            .expect(409)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('msg');
                done();
            })
        })
    })

    describe('PUT / put a folder in a user by folderName', () => {
        it('should respond an object, have status 204', function(done) {
            const folderA = {
                folderName: 'THISISMYFOLDER'
            }
            
            request
            .put('/user/genewang7@gmail.com/Thisismyfolder')
            .send(folderA)
            .expect(204)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();
                done();
            })
        })

        it('should respond a message indicating that user post a duplicate folder name, having status code 409', function(done) {
            const folderA = {
                folderName: 'MYFOLDER'
            }
            
            request
            .put('/user/genewang7@gmail.com/THISISMYFOLDER')
            .send(folderA)
            .expect(409)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('msg');
                done();
            })
        })
    })

    describe('DELETE / delete a folder in a user by folderName', () => {
        it('should respond an object, have status 204', function(done) {
            request
            .delete('/user/genewang7@gmail.com/THISISMYFOLDER')
            .expect(204)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();
                done();
            })
        })
    })
});