const express = require("express")
const connectDB = require("./config/database")
const config = require("./config/config")
const globalErrorHandler = require("./middlewares/globalErrorHandler")
const cookieParser = require("cookie-parser")

const app = express()

const PORT = config.port
connectDB()

app.use(express.json())
app.use(cookieParser)

app.get("/", (req, res) => {
    res.json({ message: "Hello from Server!" })
})

app.use("/api/user", require("./routes/userRoute"))

app.use(globalErrorHandler)

app.listen(PORT, () => {
    console.log(`✅ Server is listening on port ${PORT}`)
})