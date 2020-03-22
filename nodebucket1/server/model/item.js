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

// create item schema
let itemSchema = mongoose.Schema({
  text:{type: String}
});
// export model for public
module.exports = itemSchema;
