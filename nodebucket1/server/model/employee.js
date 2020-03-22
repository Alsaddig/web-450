/*

============================================
; Title:  item .js
; Author: Alsaddig Ibrahim
; Date:   march 19 2020

; Description: part of nodebucket
;===========================================
*/
//requires mongoose
const mongoose = require('mongoose');
const Item = require('./item');

// create employee schema and adding two new fields to the employee model
let employeeSchema = mongoose.Schema({
  empId: { type: String, unique: true, dropDups: true },
  firstname: { type: String },
  lastname: { type: String },
  todo: [Item],
  done: [Item]
});
// export model for public
module.exports = mongoose.model('Employee', employeeSchema);
