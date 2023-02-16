const { StatusCodes } = require('http-status-codes');

const isAdmin = (req, res, next) => {
    return req.user.userType == "ADMIN" ? next() : res.status(StatusCodes.FORBIDDEN).send("Access Denied – You don’t have permission to access");
}

const isLoggedIn = (req, res, next) => {
    return req.user.username != undefined ? next() : res.status(StatusCodes.FORBIDDEN).send("Access Denied – You don’t have permission to access");
}
module.exports = {
    isAdmin,
    isLoggedIn
};