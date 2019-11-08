const mongoose = require ('mongoose');

module.exports= mongoose.model('Books', new mongoose.Schema({
    author: String, 
    country: String, 
    imageLink: String, 
    language: String, 
    link: String, 
    pages: Number, 
    title: String, 
    year: Number,
    id: Number
}), 'books')