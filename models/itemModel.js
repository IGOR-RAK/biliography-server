const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
   
  },

);

module.exports = mongoose.model("Items", itemSchema);