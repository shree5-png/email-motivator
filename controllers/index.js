const {BadRequest} = require("../errors");
const {ErrorNotFound}= require("../errors")
const {StatusCodes }= require("http-status-codes");
const User = require("../models/emailSchema");
const Goods = require("../models/goodiesSchema");
const nodemailer = require("nodemailer");
require("dotenv").config();


//put email to database but check if it already exist or not
const obtainEmail = async (req,res)=>{

    const receivedEmail = req.params.id;
    console.log(receivedEmail);


    // if(receivedEmail === "send"){
    //   return res.status(StatusCodes.OK).send("Email sending process initialized");
       
    // }

    if(receivedEmail === " "){
        throw new ErrorNotFound("Email Not found");
    }

    if(!validateEmail(receivedEmail)){
        throw new BadRequest("Bad email type");
    }

    const ifexist =await User.findOne({email: receivedEmail});
    
        if(ifexist){
            throw new BadRequest("Email already exist || we are already motivating that user");
            
        }

    const user = await User.create({email: req.params.id.toLowerCase()});

    res.status(StatusCodes.CREATED).json({email: user.email, message: `We will send you an email!!!`})

}

//////////////////////////////////////sending mail///////////////////////////////////////////////////////////

let randomQuotes;
//get goodies  from database which is already pushed!!!
const getGoodies = async (req,res)=>{

    const quotes = await Goods.find({});

    const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;

    randomQuotes =  quotes[randomNumber]

    // console.log(randomQuotes);
   


};

//get email from database and send mail
const sendMail =async (req,res)=>{


    // console.log(randomQuotes);
    let transporter = nodemailer.createTransport({
        service:"gmail",

        auth : {
            user: `${process.env.USER}`,
          
            pass: `${process.env.PASS}`
        }
    });



    const emailsFromDB =await User.find({});
    const emailsInArray = emailsFromDB.map(result => result.email )
   
    const mailString = emailsInArray.join(",")

   


    let mailOptions = {
        from : `${process.env.USER}`,
        to:`${mailString}`,
        subject:`${randomQuotes.subject}`,
        text: `"${randomQuotes.quote}" by -${randomQuotes.author}`
    }


    // res.status(200).send(`Email sending process initialized...`);
    console.log("Email sending process initialized...");

    
transporter.sendMail(mailOptions, function(error,info){
    if(error){
        // console.log(error)
       throw new BadRequest("Something unusual has happened!");
    }else{
        // console.log("Email send: " + info.response)
        
        res.status(200).send("Email sent : OK");
    }
})

}

//homepage request 
const homePage = (req,res)=>{
    res.status(200).send("<h1>Welcome to the Moti-Vator</h1><br><p>Please enter the email alongside this page's url to send the motivational quotes</p>")
}


//check if the email is valid or not
const validateEmail = (email)=>{
    
    return String(email).toLowerCase().match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
}

getGoodies();


module.exports = {obtainEmail, sendMail,homePage}