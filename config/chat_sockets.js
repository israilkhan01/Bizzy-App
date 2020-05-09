module.exports.chatsockets=function(socketserver){
   let io=require('socket.io')(socketserver);
   io.sockets.on('connection',function(socket){
       console.log('new connection recieved',socket.id)
       socket.on('disconnect',function(){
           console.log('socket disconnect');
       });
       socket.on('join_room',function(data){
           console.log('joining request rec',data);
           socket.join(data.chatroom);
           io.in(data.chatroom).emit('user joined',data);

       })
   });
   
}