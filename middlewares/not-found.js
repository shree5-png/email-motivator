const {StatusCodes} = require("http-status-codes")

const notFoundMiddleware = (req,res)=>{res.status(404).json({err: `request not found ${StatusCodes.NOT_FOUND}`})}

module.exports = notFoundMiddleware;