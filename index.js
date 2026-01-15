const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const port = 3003;
const app = express();
const server = createServer(app);
const io = new Server(server);

let usersCount = 0;

// assign usernames and colors
const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6'];

io.on('connection', (socket) => {
  usersCount++;
    // assign random color
  const userColor = colors[Math.floor(Math.random() * colors.length)];
  socket.data.color = userColor;
   // ask client for username
  socket.emit('request username');
  socket.on('set username', (username) => {
    socket.data.username = username || 'Anonymous';
    io.emit('chat message', {
      system: true,
      message: `🔵 ${socket.data.username} joined (${usersCount} online)`
    });
  });
  socket.on('chat message', (msg) => {
    const time = new Date().toLocaleTimeString();
    io.emit('chat message', {
      user: socket.data.username,
      color: socket.data.color,
      message: msg,
      time
    });
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', `${socket.data.username} is typing...`);
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('typing', '');
  });

  socket.on('disconnect', () => {
    usersCount--;
    io.emit('chat message', {
      system: true,
      message: `🔴 ${socket.data.username || 'A user'} left (${usersCount} online)`
    });
  });
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

server.listen(port, () => {
  console.log('Server running at http://localhost:' + port);
});
