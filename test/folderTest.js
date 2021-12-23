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
                should(res.body.folder).have.property('_id');   
                should(res.body.folder).have.property('folderName');   
                should(res.body.folder).have.property('diary');   
                done();
            })
        })
    })

    describe('POST / post a folder in a user', () => {
        it('should respond an object, have status 200', function(done) {
            const folderA = {
                folderName: 'MYFOLDER'
            }
            
            request
            .post('/user/genewang7@gmail.com/folder')
            .send(folderA)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();
                done();
            })
        })
    })

    describe('PUT / put a folder in a user by folderName', () => {
        it('should respond an object, have status 200', function(done) {
            const folderA = {
                folderName: 'mYfOlDeR'
            }
            
            request
            .put('/user/genewang7@gmail.com/MYFOLDER')
            .send(folderA)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();
                done();
            })
        })
    })

    describe('DELETE / delete a folder in a user by folderName', () => {
        it('should respond an object, have status 200', function(done) {
            request
            .delete('/user/genewang7@gmail.com/mYfOlDeR')
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();
                done();
            })
        })
    })
});