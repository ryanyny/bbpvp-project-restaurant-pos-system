const express = require("express")
const connectDB = require("./config/database")
const config = require("./config/config")
const globalErrorHandler = require("./middleware/globalErrorHandler")

const app = express()

const PORT = config.port
connectDB()

app.get("/", (req, res) => {
    res.json({ message: "Hello from Server!" })
})

app.use(globalErrorHandler)

app.listen(PORT, () => {
    console.log(`✅ Server is listening on port ${PORT}`)
})