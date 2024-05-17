const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rice8828',
    database: 'employee_db'
})


module.exports = mysqlPool