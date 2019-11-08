var books = require('./books.json');
var FS = require('fs')

var ID = 0;
books.forEach(book =>{
    book.id = ID++;
    
});

FS.writeFileSync('books.json', JSON.stringify(books), {encoding: 'utf-8'});