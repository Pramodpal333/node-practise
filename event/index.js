const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

// Listener for 'greet' event
eventEmitter.on("greet",(name)=>{
console.log(`Hello ${name}, welcome to the event-driven world!`);
});


// Listener for once
eventEmitter.once("notify",(message)=> {
console.log(`\n\nNotification received: ${message}\n\n`);
});


// Emit the 'greet' event
eventEmitter.emit("greet","Pramod");

// Emit the 'notify' event twice
eventEmitter.emit("notify","This is a sample once event notification.");
eventEmitter.emit("notify","This notification will not be logged.");

console.log("Event emissions complete.");