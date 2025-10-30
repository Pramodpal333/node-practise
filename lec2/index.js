const http = require("node:http");

const server = http.createServer(function(req,res){
console.log("Got a new Request!!");

console.log(req.method);
console.log(req.url);

switch(req.url){
    case '/':
        res.writeHead(200);
        return res.end("Home page");
    case '/about':
        res.writeHead(200);
        return res.end("About Us");
    case '/contact':
            res.writeHead(200);
        return res.end("Contacts");
    default:
            res.writeHead(404);
        return res.end("You are lost");
}

});

//Listening to the server 
server.listen(5000,function(){
    console.log('Server is Up and Running...');
})