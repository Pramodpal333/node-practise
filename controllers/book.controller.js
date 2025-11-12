const { eq } = require('drizzle-orm');
const db = require('../db/index')
const {booksTable} = require('../models/index');
const { table } = require('console');

exports.getAllBooks = async function(req,res){
    const books = await db.select().from(booksTable)
     return res.json(books);
}


exports.getBookById = async function(req,res){
      const id = req.params.id;

    const [book] = await db.select().from(booksTable).where(table => eq(table.id , id)).limit(1);

    if(!book)
        return res.status(404).json({'error':`Book with id ${id} not found`});

    return res.json(book);
}


exports.createBook = async function(req,res){
    
    console.log(req.body);

     const {title, authorId,description} = req.body;

    if(!title || title === '')
        return res.status(400).json({error:'Title is required'});

     if(!authorId || authorId === '')
        return res.status(400).json({error:'Auther Id is required'});

     const [result] = await db.insert(booksTable).values({title,description,authorId}).returning({
        id:booksTable.id
     });
   

     res.status(201).json({success: true,message: 'Book added sucessfully',id:result.id});

}


exports.deleteBookById = async function(req,res){
    
      const id = req.params.id;

    await db.delete(booksTable).where(eq(booksTable.id,id));
    res.json({success: true,messgae: `Book deleted of ID ${id}`});
}