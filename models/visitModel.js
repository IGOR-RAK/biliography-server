const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    visit: {
        type: number,        
    },
   
  },

);

module.exports = mongoose.model("Visits", visitSchema);