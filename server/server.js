const io=require('socket.io')(3000,{
  cors:{
    origin:['http://localhost:8080'],
  }
});

io.on('connect', socket=>{
    console.log('user connected');
    console.log(socket.id);
})