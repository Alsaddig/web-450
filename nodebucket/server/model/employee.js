const mongoose = require('mongoose');

let employeeSchema = mongoose.Schema({
  empId: { type: String, unique: true, dropDups: true },
  firstName: { type: String },
  lastName: { type: String },
}, {
  collection: 'employees'
})

module.exports = mongoose.model('Employee', employeeSchema);
