const EventEmitter = require("events");


// Custom chat class extending EventEmitter
class Chat extends EventEmitter{
    sendMessage(msg){
        console.log(`Message sent: ${msg}`);
        this.emit("message",msg);
    }
}

//Create instance of the custom class
const chat = new Chat();


//Create a listener for message event
chat.on("message",(msg)=>{
    console.log(`New message received: ${msg}`);
});

//Emit a message event
chat.sendMessage("Hello everyone! This is a test message.");
