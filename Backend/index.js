const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    { default: mongoose } = require('mongoose'),
    cors = require('cors'),
    app = express(),
    dotenv = require('dotenv').config(),
    jwt = require('jsonwebtoken'),
    statusCode = require('http-status-codes').StatusCodes,
    port = 8080;

// CORS Handling    
app.use(cors({
    origin: '*'
}));

// Cookies and body parsers    
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(statusCode.UNAUTHORIZED)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(statusCode.FORBIDDEN);
        req.user = user;
        next();
    });
  }

// Import the Controllers
const categoryRoute = require('./Controllers/category'),
    userRoute = require('./Controllers/user'),
    apiRoute = require('./Controllers/api'),
    bookmarkRoute = require('./Controllers/bookmark');


// Connect mongo
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection opened");
    }).catch(err => {
        console.log("no connection started");
    })

// Routes    
app.use('/category',categoryRoute);
app.use('/user', userRoute);
app.use('/api', apiRoute);
app.use('/bookmark', bookmarkRoute);

// Server Runner
app.listen(port, () => {
    console.log(`listening on port ${port}!`);
})