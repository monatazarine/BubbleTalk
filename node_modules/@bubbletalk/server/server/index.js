require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 4000;
const { Server } = require('socket.io');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const Redis = require('redis');
const authRouter = require('./routes/authRouter');  
const session = require('express-session');

//create a server
const server = require('http').createServer(app);

const  RedisStore  = require("connect-redis");
const redisClient = Redis.createClient();



//create a socket server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
         credentials: true,
    }
});
//create a redis client
//stores user session data in a Redis database instead of the server's RAM
//users won't be logged out aut if the server restart


redisClient.on("error", (err) => {
    console.error("Redis error: ", err.message);
});
//middleware
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

app.use(session({
            secret: process.env.COOKIE_SECRET,
            credentials: true,
            resave: false,
            name: 'sid',
            store: new RedisStore({ client: redisClient }),
            saveUninitialized: false,
            cookie: { 
                secure: process.env.ENVIRONMENT === 'production'? "true" : "auto",
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24* 7, // 7 days
                sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
            }
        }));

 app.get('/', (req, res) => {
     res.send('Hello World!');
 });
 app.use('/auth', authRouter);
io.on('connection', (socket) => {
    console.log('a user connected');  });


 server.listen(PORT, () => {
     console.log(`Server is running on: http://localhost:${PORT}`);
 });




