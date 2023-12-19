
const mongoose = require("mongoose");

const goodiesSchema = new mongoose.Schema({

    quote:{
        type:String,
        required:[true,"quotes required"]
    },

    author:{
        type:String,
        required:[true, "author is required"]
    },

    subject:{
        type:String,
        required:[true, "author is required"]
    }

});

module.exports = mongoose.model("Goods",goodiesSchema);