require("dotenv").config()

const config = Object.freeze({
    port: process.env.PORT || 3000,
    databaseURI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/restohub",
    nodeEnv: process.env.NODE_ENV || "development",
    accessTokenSecret: process.env.JWT_SECRET
})

module.exports = config