const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  baseSalary: { type: Number, required: true },
  tax: { type: Number, required: true },
  bonus: { type: Number, default: 0 },
  netPay: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

employeeSchema.pre("save", function (next) {
  this.netPay = this.baseSalary - this.tax + this.bonus;
  next();
});

module.exports = mongoose.model("Employee", employeeSchema);