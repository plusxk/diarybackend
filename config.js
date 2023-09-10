const dotenv = require("dotenv")
dotenv.config()
module.exports = {
    port: 3001,
    db: {
      production: process.env.MONGO,
      development: process.env.MONGO,
      test: process.env.MONGO,
    },
    dbParams: {
        useNewUrlParser: true,
    },

    authenticateJWT: "diary_project",

    secretKey: "diary_project"
};