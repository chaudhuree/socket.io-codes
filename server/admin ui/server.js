const { instrument } = require("@socket.io/admin-ui");
const io = require('socket.io')(3000, {
  cors: {
    // origin: ['http://localhost:8080','https://admin.socket.io'],
    origin: "*",
  }
});

io.on('connection', socket => {
  console.log(socket.id);

  // receive client data
  // socket.on('client-data', (num, str, obj) => {
  //   console.log(num, str, obj);
  // }
  // );

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

instrument(io, {
  auth: false
});