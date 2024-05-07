const EErrors = require("../enums")

const errorHandler = (error, req, res, next) => {
    console.error("Error detectado entrando al Error Handler")
    console.log(error.cause)
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({ status: "error", error: error.name })
            break
        default:
            res.send({ status: "error", error: "Unhandled error!" })
    }
}


module.exports = errorHandler