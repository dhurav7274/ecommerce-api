import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import UserRouter from "./routers/UserRouter.js";
import { AddressRouter } from "./routers/AddressRouter.js";
import {CategoryRouter} from "./routers/CategoryRouter.js";
import {ProductRouter} from "./routers/ProductRouter.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";
const app = express();

// Define allowed origins
// const allowedOrigins = ['https://softadda.com'];

// Database connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("database connected !!");
  })
  .catch(() => {
    console.log("database not connected !!");
  });

// Configure CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || process.env.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

// all router
app.use("/user", UserRouter);
app.use("/address", AddressRouter);
app.use("/category", CategoryRouter);
app.use("/product", ProductRouter);

app.listen(5000, () => {
  console.log("Server start on port number 5000 !!");
});
