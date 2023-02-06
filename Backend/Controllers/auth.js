const express = require('express'),
    hash = require('object-hash'),
    jwt = require('jsonwebtoken'),
    { StatusCodes } = require('http-status-codes'),
    User = require('../Models/user'),
    { JWT_SECRET, REFRESH_SECRET } = process.env;

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  try {
    // Check if the username exists in the database
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Username or password is incorrect' });
    }

    // Check if the password is correct
    
      const isPasswordMatch = hash(req.body.password) == user.password;
    if (!isPasswordMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Username or password is incorrect' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET);

    res.status(StatusCodes.OK).send({ token, refreshToken });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'An error occured while logging in' });
  }
});

// Refresh Token Route
router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Refresh token is required' });
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'User not found' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(StatusCodes.OK).send({ token });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Refresh token has expired' });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'An error occured while refreshing the token' });
  }
});

router.post('/signup', async (req, res) => {
    try {
      const { username, firstName, lastName, gender, birthday, email, password } = req.body;
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          error: 'Username already in use'
        });
      }
  
        const hashedPassword = hash(password);;
  
        const user = new User({
            username,
            firstName,
            lastName,
            gender,
            birthday: Date.parse(birthday),
            email,
            password: hashedPassword,
            userType: "CLIENT"
        });
  
      await user.save();
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET);
  
      return res.status(StatusCodes.CREATED).send({ token, refreshToken });
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: 'Something went wrong, please try again'
      });
    }
  });

module.exports = router;