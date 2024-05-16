const express = require("express")
const app = express()

const { connectDb } = require("./config/db.js")

const port = process.env.PORT || 3000

// Connect to MySQL DB
connectDb()

// Middleware
app.use("/api", require("./routes/employee.js"))

// Listen to Server
app.listen(() => {
    console.log("Server Running at Port: ", port)
})