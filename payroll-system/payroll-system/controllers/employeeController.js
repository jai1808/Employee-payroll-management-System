const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  try {
    const emp = await Employee.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  const employees = await Employee.find({ createdBy: req.user.id });
  res.json(employees);
};

exports.updateEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ error: "Not found" });
    if (String(emp.createdBy) !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ error: "Forbidden" });

    Object.assign(emp, req.body);
    await emp.save();
    res.json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  if (!emp) return res.status(404).json({ error: "Not found" });
  await emp.deleteOne();
  res.json({ message: "Deleted" });
};