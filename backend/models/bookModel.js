// structure our database

import mongoose from "mongoose";


// build our book model
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String, 
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
    );

export const Book = mongoose.model('Cat', bookSchema);  //创建不同模型 会创建不同db？


// database 是建立在data model 上的，所以different data model means different database