const { mysqlPool: db  } = require("../config/db")

const getEmployees = async (request, response) => {
    try {
        const [rows] = await db.query("SELECT * FROM employees")
        return response.status(200).json({
            success: true, 
            data: rows
        })
        // const rows = await db.query("SELECT * FROM employees")
        // response.send(rows[0])
    } catch (error) {
        console.log("Get All Employees Error", error)
        return response.status(500).json({
            success: false, 
            error
        })
    }
    // db.query("SELECT * FROM employees")
    //     .then(data => response.send(data[0]))
    //     .catch(error => {
    //         console.log(error), 
    //         response.send(error)
    //     })
}

module.exports = {
    getEmployees
}