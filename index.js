const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

//Temp DB
const books = [
    {'id':1, 'title': '48 Laws of power', 'auther': 'Rober greenc'},
    {'id':2, 'title': 'Steal like an artist', 'auther': 'xyzzz'},
];

app.get('/books',(req,res)=>{
    res.json(books);

});

app.get('/books/:id',(req,res)=>{

    const id = parseInt(req.params.id);

    if(isNaN(id))
        return res.status(400).json({'error': 'Inavlid request, is should be a number'});

    const book = books.find(e=> e.id === id);

    if(!book)
        return res.status(404).json({'error':`Book with id ${id} not found`});

    return res.json(book);

});


app.post('/books',(req,res)=>{

    console.log(req.body);

     const {title, auther} = req.body;

    if(!title || title === '')
        return res.status(400).json({error:'Title is required'});

     if(!auther || auther === '')
        return res.status(400).json({error:'Auther is required'});

     const id = books.length +1;
     const book = {id,title,auther};

     books.push(book);
   

     res.status(201).json({success: true,message: 'Book added sucessfully'});

});


app.delete('/books/:id',(req,res)=>{

      const id = parseInt(req.params.id);

    if(isNaN(id))
        return res.status(400).json({'error': 'Inavlid request, is should be a number'});

    const indexToDelete = books.findIndex(e=> e.id === id);

    if(indexToDelete < 0)
        return res.status(404).json({messgae:'Book not found'});

    books.splice(indexToDelete,1);
    res.json({success: true,messgae: `Book deleted of ID ${id}`});
})

app.listen(PORT,()=> console.log(`Server is up and running at port ${PORT}`));