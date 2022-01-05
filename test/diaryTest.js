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

describe('Diary Controller Test', () => {
    describe('GET/ get a diary by title', () => {
        it('should respond an object, having status 200', function(done) {
            request
            .get('/user/genewang7@gmail.com/Uncategorized/MY')
            .set('authorization', token)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();
                should(res.body).have.property('token');
                should(res.body.diary).have.property('_id');
                should(res.body.diary).have.property('title');
                should(res.body.diary).have.property('content');
                should(res.body.diary).have.property('tag');
                should(res.body.diary).have.property('filesURL');
                should(res.body.diary).have.property('picURL');
                should(res.body.diary).have.property('videoURL');
                should(res.body.diary).have.property('isFavored');
                should(res.body.diary).have.property('parentFolder');
                done();
            })
        })
    })

    describe('GET/ get diaries by search', () => {
        describe('search by title', () => {
            it('should respond an array, having status 200', function(done) {
                request
                .get('/search/genewang7@gmail.com?condition=title&search_query=mythirddiary')
                .set('authorization', token)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    should(res.body).have.property('token');
                    should(res.body.diaryArray).be.a.Array();
                    done();
                })
            })
        })

        describe('search by content', () => {
            it('should respond an array, having status 200', function(done) {
                request
                .get('/search/genewang7@gmail.com?condition=content&search_query=SHGSDIG')
                .set('authorization', token)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    should(res.body.diaryArray).be.a.Array();
                    done();
                })
            })
        })

        describe('search by tags', () => {
            it('should respond an array, having status 200', function(done) {
                request
                .get('/search/genewang7@gmail.com?condition=tags&search_query=tag')
                .set('authorization', token)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    should(res.body).have.property('token');
                    should(res.body.diaryArray).be.a.Array();
                    done();
                })
            })
        })
    })

    describe('GET/ get diaries by search', () => {
        describe('search by date', () => {
            it('should respond an array, having status 200', function(done) {
                request
                .get('/date/genewang7@gmail.com?date=20211224')
                .set('authorization', token)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    should(res.body).have.property('token');
                    should(res.body.diaryArray).be.a.Array();
                    done();
                })
            })
        })
    })
    
    describe('POST/ post a diary in a folder', () => {
        it('should respond an object, having status 201', function(done) {
            const diaryA = {
                title: 'testdiary',   //req.body.title
                content: '# SHGSDIG;ASIHGIS;G',   //req.body.content
                date: Date.now(),   //req.body.date
                tag: ['tagSSSS'],   //req.body.tag
                filesURL: ['filesSSSS'],    //req.body.filesURL
                picURL: ['picSSSS'],    //req.body.picURL
                videoURL: ['videosSSSS'],   //req.body.videoURL
                isFavored: false,    //req.body.isFavored
                parentFolder: 'Uncategorized'   //req.body.parentFolder
            };

            request
            .post('/user/genewang7@gmail.com/Uncategorized')
            .set('authorization', token)
            .send(diaryA)
            .expect(201)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                done();
            })
        })

        it('should respond a message indicating that user post a duplicate diary title, having status code 409', function(done) {
            const diaryA = {
                title: 'testdiary',   //req.body.title
                content: '# SHGSDIG;ASIHGIS;G',   //req.body.content
                date: Date.now(),   //req.body.date
                tag: ['tagSSSS'],   //req.body.tag
                filesURL: ['filesSSSS'],    //req.body.filesURL
                picURL: ['picSSSS'],    //req.body.picURL
                videoURL: ['videosSSSS'],   //req.body.videoURL
                isFavored: false,    //req.body.isFavored
                parentFolder: 'Uncategorized'   //req.body.parentFolder
            };

            request
            .post('/user/genewang7@gmail.com/Uncategorized')
            .set('authorization', token)
            .send(diaryA)
            .expect(409)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                should(res.body).have.property('msg');
                done();
            })
        })
    })

    describe('PUT/ put a diary in a folder', () => {
        it('should respond an object, having status 204', function(done) {
            const diaryA = {
                title: 'TESTDIARY',   //req.body.title
                content: 'SHGSDIG;ASIHGIS;G',   //req.body.content
                date: Date.now(),   //req.body.date
                tag: ['tagSSSS'],   //req.body.tag
                filesURL: ['filesSSSS'],    //req.body.filesURL
                picURL: ['picSSSS'],    //req.body.picURL
                videoURL: ['videosSSSS'],   //req.body.videoURL
                isFavored: false,    //req.body.isFavored
                parentFolder: 'Uncategorized'   //req.body.parentFolder
            };

            request
            .put('/user/genewang7@gmail.com/Uncategorized/testdiary')
            .set('authorization', token)
            .send(diaryA)
            .expect(201)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                done();
            })
        })

        it('should respond a message indicating that user post a duplicate diary title, having status code 409', function(done) {
            const diaryA = {
                title: 'mydiary',   //req.body.title
                content: '# SHGSDIG;ASIHGIS;G',   //req.body.content
                date: Date.now(),   //req.body.date
                tag: ['tagSSSS'],   //req.body.tag
                filesURL: ['filesSSSS'],    //req.body.filesURL
                picURL: ['picSSSS'],    //req.body.picURL
                videoURL: ['videosSSSS'],   //req.body.videoURL
                isFavored: false,    //req.body.isFavored
                parentFolder: 'Uncategorized'   //req.body.parentFolder
            };

            request
            .put('/user/genewang7@gmail.com/Uncategorized/TESTDIARY')
            .set('authorization', token)
            .send(diaryA)
            .expect(409)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                should(res.body).have.property('msg');
                done();
            })
        })
    })

    describe('DELETE/ delete a diary in a folder', () => {
        it('should respond an object, having status 204', function(done) {

            request
            .delete('/user/genewang7@gmail.com/Uncategorized/TESTDIARY')
            .set('authorization', token)
            .expect(201)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).have.property('token');
                done();
            })
        })
    })
});