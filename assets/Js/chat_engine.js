class ChatEngine{
    constructor(chatboxID,userEmail){
        this.chatbox=$(`#${chatboxID}`);
        this.userEmail=userEmail;
        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }

    }
// to and fro interaction between server and user which have suscribed
    connectionHandler(){
        let self=this;
     //it runs with emit and on
     this.socket.on('connect',function(){
         console.log('connection established using sockets')
         //when this event is emitted then this will be recieved at server side (chatSockets)
         self.socket.emit('join_room',{
               user_email:self.userEmail,
               chatroom:"Bizzy"
         });
         self.socket.on('user_joined',function(data){
             console.log('a user joined',data);
         })
     })
    }
}