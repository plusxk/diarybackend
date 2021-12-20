module.exports = {
    port: 3000,
    db: {
      production: "mongodb://user:pass@example.com:1234/musika",
      development: "mongodb://mongo:27017/diarydb",
      test: "mongodb+srv://test:1234@cluster0.5r4ti.mongodb.net/diarydb?retryWrites=true&w=majority",
    },
    dbParams: {
        useNewUrlParser: true,
    },

    authenticateJWT: "diary_project",

    secretKey: "diary_project"
};