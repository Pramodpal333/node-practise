const ChatRoom = require("./chatRoom");

const chatRoom = new ChatRoom();


// Listeners for all the event 

chatRoom.on("join",(user)=>{
    console.log(`${user} has joined the chat`);
});

chatRoom.on("message",(user,message)=>{
    console.log(`${user} : ${message}`);
})

chatRoom.on("leave",(user)=>{
    console.log(`${user} has left the chat`);
})

const user1 = "Raj";
const user2 = "Vivek";

// Simulating the event on our own
chatRoom.join(user1);
chatRoom.sendMessage(user1,"Hello everyone!");
chatRoom.sendMessage(user1,`Looks like ${user2} has not join yet`);

chatRoom.join(user2);
chatRoom.sendMessage(user2,`Hi ${user1}! sorry for the delay`);

chatRoom.leaveChat(user1);

chatRoom.sendMessage(user1,`this message will not deliver`);
chatRoom.leaveChat(user2);