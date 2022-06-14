
const io = require('socket.io')(3000, {
  cors: {
    // origin: ['http://localhost:8080','https://admin.socket.io'],
    origin: "*",
  }
});

io.on('connection', socket => {
  console.log(socket.id);

  // received message from client
  socket.on('send-message', (message, room) => {
    console.log(message);
    if (room === "") {
      socket.broadcast.emit('received-message', message);
    } else {
      socket.to(room).emit('received-message', message);
    }
  }
  );

  socket.on('join-room', (room, cb) => {
    socket.join(room);
    cb(`You have joined ${room}`);
  }
  );
})
// namespace and authentication related code starts here
const userIo = io.of('/user');
userIo.on('connection', socket => { 
  console.log('connected to userIo name space with username', socket.username) 
    userIo.emit('user-connected', socket.username);
})

  // authentication and user name generation
userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUserNameFromToken(socket.handshake.auth.token);
    next();
  } else {
    next(new Error('Send token'));
  }
})

const getUserNameFromToken = token => token




  // namespace and authentication related code ends here

