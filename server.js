const express = require("express")
const bodyParser = require("body-parser")
require("express-async-errors")
const app = express()

const { connectDb } = require("./config/db.js")

const port = process.env.PORT || 3000

// Connect to MySQL DB
connectDb()

// Middleware
// Body Parser
app.use(bodyParser.json())
// Routes
app.use("/api", require("./routes/employee"))
// Global Error Handler
app.use((error, request, response, next) => {
    console.log("Global Error", error)
    response.status(error.status || 500).json({
        success: false, 
        message: "Global Server Error", 
        error
    })
})

// Listen to Server
app.listen(port, () => {
    console.log("Server Running at Port: ", port)
})