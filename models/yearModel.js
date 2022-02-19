const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
   
  },

);

module.exports = mongoose.model("Years", yearSchema);