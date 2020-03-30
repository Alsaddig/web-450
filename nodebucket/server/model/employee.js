//requires mongoose
const mongoose = require('mongoose');
const Item = require('./item');

// create employee schema
let employeeSchema = mongoose.Schema({
    empId: {type: String, unique: true, dropDups: true},
    firstname: {type: String},
    lastname: {type: String},
    todo: [Item],
    done: [Item],
    doing: [Item]
});
// export model for public
module.exports = mongoose.model('Employee', employeeSchema);
