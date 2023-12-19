
require("express-async-errors");
require("dotenv").config();
const connectDB = require("./db/connect")

const express = require("express");
const app = express();
const public = require("./public");






//importing
const errorHandlingMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");

//rotues
const router = require("./routes/index");

// app.use(express.static('public'))

app.use("/",router);




app.use(notFoundMiddleware);
app.use(errorHandlingMiddleware);


const PORT = process.env.PORT || 5000;

const start = async function(){

    try {

        console.log("Connecting to database");
        await connectDB(process.env.MONGO_URI);
        console.log("Success!!!")

        app.listen(PORT, ()=>{
            console.log(`connecting to server in port ${PORT}`);
        })
        
    } catch (error) {
        
        console.log(error);

    }

};

start();
