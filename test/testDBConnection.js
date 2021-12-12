const mongoose = require('mongoose');

var count = 1;
describe("connection", function () {
    it("should return token 1", async function(done) {
        this.timeout(10000);
            await mongoose
                .connect('mongodb://mongo:27017/diarydb', { useNewUrlParser: true })
                .then(() => console.log('MongoDB Connected ', 1))
                .catch(err => console.log(err));
    })

    it("should return token 2", async function(done) {
        this.timeout(10000);
            await mongoose
                .connect('mongodb://mongo:27017/diarydb', { useNewUrlParser: true })
                .then(() => console.log('MongoDB Connected ', 2))
                .catch(err => console.log(err));
    })

    it("should return token 3", async function(done) {
        this.timeout(10000);
            await mongoose
                .connect('mongodb://mongo:27017/diarydb', { useNewUrlParser: true })
                .then(() => console.log('MongoDB Connected ', 3))
                .catch(err => console.log(err));
    })

    it("should return token 4", async function(done) {
        this.timeout(10000);
            await mongoose
                .connect('mongodb://mongo:27017/diarydb', { useNewUrlParser: true })
                .then(() => console.log('MongoDB Connected ', 4))
                .catch(err => console.log(err));
    })
});
