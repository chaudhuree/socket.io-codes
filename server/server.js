const io=require('socket.io')(3000,{
  cors:{
    origin:'*'
  }
});

io.on('connect', socket=>{
    console.log('user connected');
    console.log(socket.id);
})