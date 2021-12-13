const supertest = require('supertest');
var should = require('should');
var app = require('../service');
const request = supertest(app);

describe('Diary Controller Test', () => {
    describe('GET/ get a diary by title', () => {
        it('should respond an object, having status 500', function(done) {
            request
            .get('/user/genewang7@gmail.com/Uncategorized/mydiary')
            .expect(500)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();
                should(res.body.diary).have.property('_id');
                should(res.body.diary).have.property('title');
                should(res.body.diary).have.property('content');
                should(res.body.diary).have.property('tag');
                should(res.body.diary).have.property('filesURL');
                should(res.body.diary).have.property('picURL');
                should(res.body.diary).have.property('videoURL');
                should(res.body.diary).have.property('isFavored');
                should(res.body.diary).have.property('sanitizedHtml');
                done();
            })
        })
    })

    describe('GET/ get diaries by search', () => {
        describe('search by title', () => {
            it('should respond an array, having status 500', function(done) {
                request
                .get('/search/genewang7@gmail.com?condition=title&search_query=mydiary')
                .expect(500)
                .end(function(err, res) {
                    should.not.exist(err);
                    should(res.body.diaryArray).be.a.Array();
                    done();
                })
            })
        })

        describe('search by content', () => {
            it('should respond an array, having status 500', function(done) {
                request
                .get('/search/genewang7@gmail.com?condition=content&search_query=sgegrhrh')
                .expect(500)
                .end(function(err, res) {
                    should.not.exist(err);
                    should(res.body.diaryArray).be.a.Array();
                    done();
                })
            })
        })

        describe('search by tags', () => {
            it('should respond an array, having status 500', function(done) {
                request
                .get('/search/genewang7@gmail.com?condition=tags&search_query=tag')
                .expect(500)
                .end(function(err, res) {
                    should.not.exist(err);
                    should(res.body.diaryArray).be.a.Array();
                    done();
                })
            })
        })
    })

    describe('GET/ get diaries by search', () => {
        describe('search by date', () => {
            it('should respond an array, having status 500', function(done) {
                request
                .get('/date/genewang7@gmail.com?date=20211213')
                .expect(500)
                .end(function(err, res) {
                    should.not.exist(err);
                    should(res.body.diaryArray).be.a.Array();
                    done();
                })
            })
        })
    })
    
    describe('POST/ post a diary in a folder', () => {
        it('should respond an object, having status 500', function(done) {
            const diaryA = {
                title: 'MYDIARY',   //req.body.title
                content: 'SHGSDIG;ASIHGIS;G',   //req.body.content
                date: Date.now(),   //req.body.date
                tag: ['tagSSSS'],   //req.body.tag
                filesURL: ['filesSSSS'],    //req.body.filesURL
                picURL: ['picSSSS'],    //req.body.picURL
                videoURL: ['videosSSSS'],   //req.body.videoURL
                isFavored: false    //req.body.isFavored
            };

            request
            .post('/user/genewang7@gmail.com/Uncategorized')
            .send(diaryA)
            .expect(500)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();
                done();
            })
        })
    })

    describe('PUT/ put a diary in a folder', () => {
        it('should respond an object, having status 500', function(done) {
            const diaryA = {
                title: 'MYDIARY',   //req.body.title
                content: 'SHGSDIG;ASIHGIS;G',   //req.body.content
                date: Date.now(),   //req.body.date
                tag: ['tagSSSS'],   //req.body.tag
                filesURL: ['filesSSSS'],    //req.body.filesURL
                picURL: ['picSSSS'],    //req.body.picURL
                videoURL: ['videosSSSS'],   //req.body.videoURL
                isFavored: false    //req.body.isFavored
            };

            request
            .put('/user/genewang7@gmail.com/Uncategorized/MYDIARY')
            .send(diaryA)
            .expect(500)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();
                done();
            })
        })
    })

    describe('DELETE/ delete a diary in a folder', () => {
        it('should respond an object, having status 500', function(done) {

            request
            .delete('/user/genewang7@gmail.com/Uncategorized/MYDIARY')
            .expect(500)
            .end(function(err, res) {
                should.not.exist(err);
                should(res.body).be.a.Object();
                done();
            })
        })
    })
});