// this file is a server that uses expressjs 

import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import logger from './utils/logger.js';


const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors());

// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

// this is our HTTP method that used for getting resource from server
app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send("Welcome to MERN stack tutorial !");
});

// use the route that we set up at route folder
app.use('/books', booksRoute);

// use mongoose to connect our database (backend connected to a database)
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      // logger.info(`App is listening to port: ${PORT}`);
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    // logger.error(error);
    console.log(error);
  });


