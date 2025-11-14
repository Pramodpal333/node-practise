require('dotenv/config');
const express = require('express');
const bookRouter = require('./routes/book.routes')
const authorRouter = require('./routes/author.routes')

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/books',bookRouter);

app.use('/authors',authorRouter);

app.listen(PORT,()=> console.log(`Server is up and running at port ${PORT}`));