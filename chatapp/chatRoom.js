const EventEmitter = require("events");
const eventEmitter =  new EventEmitter();


class ChatRoom extends EventEmitter{

    constructor(){
        super()
        this.users = new Set();
    }


    join(user){
        this.users.add(user);
       this.emit("Join",user);
    }

    sendMessage(user,message){
        if(this.users.has(user)){
            this.emit('message',user,message);
        }else{
            console.log(`Message could not be send because ${user} is not in the chat`);
        }
    }


    leaveChat(user){
        if(this.users.has(user)){
            this.users.delete(user);
        this.emit('leave',user);
    }else{
            console.log(`${user} is not in the chat`);
        }
    }


}


module.exports = ChatRoom;