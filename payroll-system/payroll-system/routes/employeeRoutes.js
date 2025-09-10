const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const emp = require("../controllers/employeeController");

router.post("/", auth, emp.createEmployee);
router.get("/", auth, emp.getEmployees);
router.put("/:id", auth, emp.updateEmployee);
router.delete("/:id", auth, emp.deleteEmployee);

module.exports = router;