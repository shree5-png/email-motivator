const CustomAPIError = require("./customapierror");
const {StatusCodes} = require("http-status-codes")


class ErrorNotFound extends CustomAPIError{

    constructor(message){
        super(message);

        this.statusCode =StatusCodes.NOT_FOUND;
    }
}

module.exports = ErrorNotFound;