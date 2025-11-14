const { eq, sql } = require('drizzle-orm');
const db = require('../db/index')
const {booksTable, authorsTable} = require('../models/index');
const { table } = require('console');

exports.getAllBooks = async function(req,res){

    //Search using indexing in node
    const search = req.query.search;
    if(search){
        const books = await db.select().from(booksTable)
        .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`);

         return res.json(books);
    }

    const books = await db.select().from(booksTable)
     return res.json(books);
}


exports.getBookById = async function(req,res){
      const id = req.params.id;

    const [book] = await db.select().from(booksTable).where(table => eq(table.id , id)).leftJoin(authorsTable,eq(booksTable.authorId,authorsTable.id)).limit(1);

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
   

    return res.status(201).json({success: true,message: 'Book added sucessfully',id:result.id});

}


exports.deleteBookById = async function(req,res){
    
      const id = req.params.id;

    await db.delete(booksTable).where(eq(booksTable.id,id));
    return res.json({success: true,messgae: `Book deleted of ID ${id}`});
}