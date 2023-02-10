const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    { default: mongoose } = require('mongoose'),
    cors = require('cors'),
    app = express(),
    dotenv = require('dotenv').config(),
    jwt = require('jsonwebtoken'),
    {StatusCodes} = require('http-status-codes'),
    port = 8080,
    swaggerJSDoc = require('swagger-jsdoc'),
    swaggerUi = require('swagger-ui-express'),
    http = require('http');
    
    const server = http.createServer(app);
    const { Server } = require("socket.io");
    const io = new Server(server, {cors: {origin: "*"}})

// CORS Handling    
app.use(cors({
    origin: '*'
}));

// Socket bind
let onlineUsers = 0;

io.on("connection", (socket) => {
    onlineUsers++;
    console.log(onlineUsers);
  socket.emit("updateUsers", onlineUsers);
  socket.broadcast.emit("updateUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    socket.broadcast.emit("updateUsers", onlineUsers);
  });
});


// Swagger Setup
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Public API Swagger',
      version: '1.0.0',
      description: 'An api swagger',
    },
    tags: [
        {
            name: 'Category',
            description: 'Operations related to categories',
        },
        {
            name: 'User',
            description: 'Operations related to users',
        },
        {
            name: 'API',
            description: 'Operations related to apis',
        },
        {
            name: 'Bookmark',
            description: 'Operations related to bookmarks',
        },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./Controllers/*.js'],
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Cookies and body parsers    
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader == null) {
            req.user = { userType: "CLIENT"};
            return next();
        }
        const token = authHeader && authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        if (err.name == TokenExpiredError) {
            return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'JWT Token Expired' });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'JWT Token Expired' });
        }
    }
  }


// Import the Controllers
const categoryRoute = require('./Controllers/category'),
    userRoute = require('./Controllers/user'),
    apiRoute = require('./Controllers/api'),
    bookmarkRoute = require('./Controllers/bookmark'),
    authRoute = require('./Controllers/auth');


// Connect mongo
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection opened");
    }).catch(err => {
        console.log("no connection started");
    })

// Routes    
app.use('/category',categoryRoute);
app.use('/user',authenticateToken,userRoute);
app.use('/api',authenticateToken,apiRoute);
app.use('/bookmark',authenticateToken, bookmarkRoute);  
app.use('/auth', authRoute);

// Server Runner
server.listen(port, () => {
    console.log(`listening on port ${port}!`);
})