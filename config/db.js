const mysql = require("mysql2/promise")

const mysqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "rice8828",
    database: "employee_db"
})

const connectDb = () => {
    mysqlPool.query("SELECT 1")
        .then((data) => {
            console.log("MySQL Connection has been established successfully.", data)
        })
        .catch((error) => {
            console.log("MySQL Failed to Establish Connection", error)
        })
}

module.exports = { mysqlPool, connectDb }