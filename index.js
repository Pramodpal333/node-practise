
import express from 'express';
import userRouter from './route/user.routes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/',(req,res)=>{
return res.json({status:`The server is Running on Port: ${PORT}`});
});

app.use('/users',userRouter);

app.listen(PORT,()=> console.log('Server is Running on Port',PORT));