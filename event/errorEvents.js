const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

//Listen for any error
eventEmitter.on("error",(err)=>{
    console.error(`An error occurred: ${err.message}`);
});

// Emit an error event
eventEmitter.emit("error", new Error("Something went wrong!"));