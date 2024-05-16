const express = require("express")
const router = express.Router()

const { getEmployees, getEmployee, deleteEmployee, addUpdateEmployee } = require("../controller/employee")

// Get All Employees
router.get("/employees", getEmployees)

// Get Single Employee
router.get("/employees/:id", getEmployee)

// Delete Single Employee
router.delete("/employees/:id", deleteEmployee)

// Create An Employee
router.post("/employees", addUpdateEmployee)

// Update An Employee
router.put("/employees/:id", addUpdateEmployee)

module.exports = router