const { eq } = require("drizzle-orm");
const db = require("../db/index")
const { authorsTable, booksTable } = require("../models")


exports.getAllAuthors = async function(req,res){
    const authors = await db.select().from(authorsTable);
    return res.json(authors);
}


exports.getAuthorById = async function(req,res){

    const id = req.params.id;

    if(!id || id === '') return res.status(400).json({message:'Invalid Request! ID is invalid'});

    const [author] = await db.select().from(authorsTable).where(eq(authorsTable.id,id)).limit(1);

    if(!author){
        return res.status(404).json({message: `Author does not exist with ID ${req.params.id}`});
    }

    return res.json(author);
}


exports.createAuthor = async function(req,res){
    const {firstName,lastName,email} = req.body;

    if(!firstName){
        return res.status(400).json({message : 'Invalid Request! First name is required'});
    }

     if(!email){
        return res.status(400).json({message : 'Invalid Request! Email is required'});
    }

    const [result] = await db.insert(authorsTable).values({firstName,lastName,email}).returning({
        id: authorsTable.id
    });

    return res.status(201).json({message:`Auther created!`,id: result.id});
}


exports.deleteAuthorById = async function(req,res){

    const id = req.params.id;

   await db.delete(authorsTable).where(eq(authorsTable.id,id));

    return res.json({message: `The auther with id ${id}, is deleted from DB`});
}


exports.getBooksByAuthor = async function(req,res){
    const books  = await db.select().from(booksTable).where(eq(booksTable.authorId,req.params.id));

    return res.json(books);
}