const { mysqlPool: db  } = require("../config/db")

const getEmployees = async (request, response) => {
    try {
        const [rows] = await db.query("SELECT * FROM employees")
        return response.status(200).json({
            success: true, 
            message: `All ${rows.length} Employees Fetched Successfully`,
            data: rows
        })
        // const rows = await db.query("SELECT * FROM employees")
        // response.send(rows[0])
    } catch (error) {
        console.log("Get All Employees Error", error)
        return response.status(500).json({
            success: false, 
            message: "Get All Employees Error",
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

const getEmployee = async (request, response) => {
    const id = request.params.id
    try {
        // const [row] = await db.query("SELECT * FROM employees WHERE id = " + id)
        // const [row] = await db.query("SELECT * FROM employees WHERE id = ?", [id])
        const [row] = await db.query(`SELECT * FROM employees WHERE id=${id}`)
        if (row.length === 0) {
            return response.status(404).json({
                success: false, 
                message: `Employee with ID (${id}) Not Found`
            })
        }
        const employee = row[0]
        return response.status(200).json({
            success: true, 
            message: `Employee with ID (${employee.id}) Fetched Successfully`,
            data: employee
        })
    } catch (error) {
        console.log("Get Single Employee Error", error)
        return response.status(500).json({
            success: false, 
            message: "Get Single Employee Error",
            error
        })
    }
}

const deleteEmployee = async (request, response) => {
    const id = request.params.id
    try {
        // const [query] = await db.query(`DELETE FROM employees WHERE id=${id}`)
        // const affectedRows = query.affectedRows
        const [{ affectedRows }] = await db.query(`DELETE FROM employees WHERE id=${id}`)
        if (affectedRows === 0) {
            return response.status(404).json({
                success: false, 
                message: `Employee with ID (${id}) Not Found and cannot be Deleted`
            })
        }
        return response.status(200).json({
            success: true, 
            message: `Employee with ID (${employee.id}) Deleted Successfully`
        })
    } catch (error) {
        console.log("Delete Single Employee Error", error)
        return response.status(500).json({
            success: false, 
            message: "Delete Single Employees Error",
            error
        })
    }
}

const addUpdateEmployee = async (request, response) => {
    const id = request.params.id ? request.params.id : 0
    console.log("Body", request.body)
    const { name, salary, employee_code } = request.body
    try {
        if (name === undefined || salary === undefined || employee_code === undefined) {
            return response.status(304).json({
                success: false, 
                message: `Please Fill in All Required Fields`
            })
        }
        // const [data] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?)", [id, name, employee_code, salary])
        // const affectedRows = data[0][0].affectedRows
        const [[[{affectedRows}]]] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?)", [id, name, employee_code, salary])

        if (affectedRows === 0 && id !== 0) {
            return response.status(404).json({
                success: false, 
                message: `Employee with ID (${id}) Not Found and cannot be Updated`
            })
        }
        return response.status(201).json({
            success: true, 
            message: id === 0 ? "Employee has been Created Successfully" : "Employee has been Updated Successfully",
            data: request.body
        })
    } catch (error) {
        console.log(id === 0 ?  "Employee Create Error" : "Employee Updated Error", error)
        return response.status(500).json({
            success: false, 
            message: id === 0 ?  "Employee Create Error" : "Employee Updated Error",
            error
        })
    }
}

module.exports = {
    getEmployees,
    getEmployee,
    deleteEmployee,
    addUpdateEmployee
}