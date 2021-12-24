module.exports = {
    port: 3001,
    db: {
      production: "mongodb+srv://test:1234@cluster0.5r4ti.mongodb.net/diarydb?retryWrites=true&w=majority",
      development: "mongodb+srv://test:1234@cluster0.5r4ti.mongodb.net/diarydb?retryWrites=true&w=majority",
      test: "mongodb+srv://test:1234@unittest.ocwrg.mongodb.net/diarydb?retryWrites=true&w=majority",
    },
    dbParams: {
        useNewUrlParser: true,
    },

    authenticateJWT: "diary_project",

    secretKey: "diary_project"
};