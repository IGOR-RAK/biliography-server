const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    author: {
        type: String,
        required: true,
        trim: true,       
    },
    img_src:{
        type: String,
        required: true,
        unique: true
    },
    letter:{
        type: String,
        required: true
    },
    note:{
        type: String,       
        trim: true,       
    },
    link:{
        type: String,       
        trim: true,       
    },
    item: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
   
  },

);

module.exports = mongoose.model("Cards", cardSchema);