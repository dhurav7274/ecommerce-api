import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
const app=express();

// Define allowed origins
const allowedOrigins = ['https://softadda.com'];

// Configure CORS options
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Block the request
        }
    }
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(5000,()=>{
    console.log("Server start on port number 5000 !!");
})