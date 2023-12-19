require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const goodies = require("./goodies.json");

const Goods = require("./models/goodiesSchema");

const start = async ()=>{

    try {

        await connectDB(process.env.MONGO_URI);
        await Goods.deleteMany();
        await Goods.create(goodies);

        console.log("Success");

        process.exit(0);
        
    } catch (error) {

        console.log(error);
        process.exit(1);
        
    }


}


start();
