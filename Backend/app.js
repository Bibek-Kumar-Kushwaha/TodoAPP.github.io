import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connectDB/connectDB.js';
import cors from 'cors'
import router from './route/todo.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.URI

//connect to database
connectDB(URI);

//middleware
app.use(cors());
app.use(express.json())

//route
app.use('/api',router)
app.get('/',(req,res)=>{
    res.send('Hi, i am ready....')
})

//listening
app.listen(PORT, ()=>{
    console.log(`server is listing on http:\\localhost:${PORT}`)
})