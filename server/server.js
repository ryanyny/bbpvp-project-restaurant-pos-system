const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/database")
const config = require("./config/config")
const globalErrorHandler = require("./middlewares/globalErrorHandler")

const app = express()

const PORT = config.port
connectDB()

app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:5173"],
    })
)
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.json({ message: "Hello from Server!" })
})

app.use("/api/users", require("./routes/userRoute"))
app.use("/api/orders", require("./routes/orderRoute"))
app.use("/api/tables", require("./routes/tableRoute"))
app.use("/api/menus", require("./routes/menuRoute"))
app.use("/api/items", require("./routes/itemRoutes"))

app.use(globalErrorHandler)

app.listen(PORT, () => {
    console.log(`✅ Server is listening on port ${PORT}`);
})