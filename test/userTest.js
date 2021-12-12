const supertest = require('supertest');
const chai = require('chai');
var should = require('should');
var app = require('../service');
const request = supertest(app);
const dbHandler = require('./dbHandler');
const User = require('../model/userDBSchema');
const { expect } = require('chai');

before(async () => await dbHandler.connect());
// afterEach(async () => await dbHandler.clearDatabase());
after(async () => await dbHandler.closeDatabase());

describe('User Controller Test', () => {
    describe('GET /user', () => {
        it('should get all users in json, respond with status 201', async () => {
            const getReq = await request
            .get('/user')
            .set('Accept', 'application/json')

            expect(getReq.statusCode).to.equal(201);
            expect(getReq.body.user).to.be.an('array');
            expect(getReq.body.user.length).to.equal(1);
        });
    })
    
    describe('GET /user/:userID', () => {
        it('should get a user in json, respond with status 201', async () => {
            const getReq = await request
            .get('/user/1')
            .set('Accept', 'application/json')
            
            console.log(getReq.body);
            // expect(getReq.statusCode).to.equal(201);
            // expect(getReq.body.user).to.be.an('object');
        })
    });
});
