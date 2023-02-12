// const hash = require('object-hash'),
//     jwt = require('jsonwebtoken'),
//     User = require('../Models/user'),
//     { JWT_SECRET, REFRESH_SECRET } = process.env;

// const login = async ({ username, password }) => {
//     if (!username || !password) {
//       throw new Error('INVALID_REQUEST');
//     }
  
//     // Check if the username exists in the database
//     const user = await User.findOne({ username });
//     if (!user) {
//       throw new Error('UNAUTHORIZED');
//     }
  
//     // Check if the password is correct
//     const isPasswordMatch = hash(password) == user.password;
//     if (!isPasswordMatch) {
//       throw new Error('UNAUTHORIZED');
//     }
  
//     // Generate JWT
//     const token = jwt.sign({ id: user._id, userType: user.userType, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
//     const refreshToken = jwt.sign({ id: user._id, userType: user.userType, username: user.username  }, REFRESH_SECRET);
  
//     return { token, refreshToken };
// };
  

const isAdmin = (req, res, next) => {
    return req.user.userType == "ADMIN" ? next() : res.status(StatusCodes.Forbidden).send("Access Denied – You don’t have permission to access");
}