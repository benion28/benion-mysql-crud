const express = require("express")
const { getEmployees } = require("../controller/employee")

const router = express.Router()

router.get("/employees", getEmployees)