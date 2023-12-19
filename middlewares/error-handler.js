
const {StatusCodes} = require("http-status-codes");
const CustomAPIError = require("../errors/customapierror");
const ErrorNotFound = require("../errors/NotFound");

const errorHandlingMiddleware = (err,req,res,next)=>{

    console.log(err.message);

    if(err.name === "E11000"){

        return res.status(err.statusCode).json({err: `email already exist`})
        
    }

    if(err instanceof CustomAPIError){

        return res.status(err.statusCode).json({err: `${err.message}`})
    }

    // if (err instanceof ErrorNotFound) {
    //     errorMessage = `Email not found: ${errorMessage}`;
    // }


    res.status(500).json({errorMessage  : `Internal Server Error ${err.statusCode}`});
}

module.exports = errorHandlingMiddleware;