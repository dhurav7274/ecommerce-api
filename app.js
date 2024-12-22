import express from 'express';
import bodyParser from 'body-parser';
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(5000,()=>{
    console.log("Server start on port number 5000 !!");
})