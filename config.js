module.exports = {
    port: 3000,
    db: {
      production: "mongodb://user:pass@example.com:1234/musika",
      development: "mongodb://mongo:27017/diarydb",
      test: "mongodb://localhost:27017/diarydb",
    },
    dbParams: {
        useNewUrlParser: true,
    },

    authenticateJWT: "diary_project"
};