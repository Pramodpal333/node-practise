const http = require("http");

//Creating the server
const server = http.createServer(function(req,res){
    console.log("Got a new requestQ!");
    res.writeHead(200);
    res.end('Thanks for visiting');

});

//Listening to server
server.listen(5000,function(){
console.log("The server is Up and Running"); // This prints means server is successfully running
});