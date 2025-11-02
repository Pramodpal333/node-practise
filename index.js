const express = require("express");

const app = express();

app.get('/',(req,res)=>{
res.end('Welcome to homepage');
});

app.get('/contact',(req,res)=>{
res.end('Here is my contact details');
});

app.post('/tweet',(req,res)=>{
    res.end('Your tweet is posted');
})

app.get('/tweet',(req,res)=>{
    res.end("Here are all tweets");
})


app.listen(5000,()=> console.log('Server is Up and Running at port 5000'));