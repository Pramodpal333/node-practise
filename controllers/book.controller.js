const {BOOKS} = require('../models/books');

exports.getAllBooks = function(req,res){
     res.json(BOOKS);
}


exports.getBookById = function(req,res){
      const id = parseInt(req.params.id);

    if(isNaN(id))
        return res.status(400).json({'error': 'Inavlid request, is should be a number'});

    const book = BOOKS.find(e=> e.id === id);

    if(!book)
        return res.status(404).json({'error':`Book with id ${id} not found`});

    return res.json(book);
}


exports.createBook = function(req,res){
    
    console.log(req.body);

     const {title, auther} = req.body;

    if(!title || title === '')
        return res.status(400).json({error:'Title is required'});

     if(!auther || auther === '')
        return res.status(400).json({error:'Auther is required'});

     const id = BOOKS.length +1;
     const book = {id,title,auther};

     BOOKS.push(book);
   

     res.status(201).json({success: true,message: 'Book added sucessfully'});

}


exports.deleteBookById = function(req,res){
    
      const id = parseInt(req.params.id);

    if(isNaN(id))
        return res.status(400).json({'error': 'Inavlid request, is should be a number'});

    const indexToDelete = BOOKS.findIndex(e=> e.id === id);

    if(indexToDelete < 0)
        return res.status(404).json({messgae:'Book not found'});

    BOOKS.splice(indexToDelete,1);
    res.json({success: true,messgae: `Book deleted of ID ${id}`});
}