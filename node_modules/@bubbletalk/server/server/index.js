const express = require('express');
const { Server } = require('socket.io');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const PORT = process.env.PORT || 4000;
const authRouter = require('./router/authRouter');  
const session = require('express-session');

require('dotenv').config()


//create a server
const sever = require('http').createServer(app);
//create a socket server
const io = new Server(sever, {
    cors: {
        origin: 'http://localhost:5173',
         credentials: true,
    }
});
//create a redis client

//middleware
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    credentials: true,
    resave: false,
    name: 'sid',
    saveUninitialized: true,
    cookie: { 
       secure: process.env.ENVIRONMENT === 'production',
       httpOnly: true,
       expire: 1000 * 60 * 60 * 24, //1 day    
       sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',}
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/auth', authRouter);


io.on('connection', (socket) => {
    console.log('a user connected');  });

sever.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});