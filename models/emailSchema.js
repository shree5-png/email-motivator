const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    email : {
        type: String,
        required: [true, "Email is necessary"],
        // match: [
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //           ,"Please provide valid Email"  ],
        match:[
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Please provide valid email"
        ],

        unique: [true, "email already exist"],

    }
})

module.exports = mongoose.model("User",UserSchema);