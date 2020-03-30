//requires mongoose
const mongoose = require('mongoose');

// create employee schema
let itemSchema = mongoose.Schema({
  text: {type: String}
});
// export model for public
module.exports = itemSchema;
