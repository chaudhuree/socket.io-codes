const io = require('socket.io')(3000, {
  cors: {
    origin: ['http://localhost:8080'],
  }
});

io.on('connection', socket => {
  console.log(socket.id);

  // receive client data
  socket.on('client-data', (num, str, obj) => {
    console.log(num, str, obj);
  }
  );

  // received message from client
  socket.on('send-message', (message) => {
    console.log(message);
    io.emit('received-message', message);
    }
  );
})