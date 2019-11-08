var http = require('http'); //Module for servers (APIs, WS)
var fileStream = require('fs'); // Module to write files
var books = require('./books.json'); // Reads file as a module
// var URL = require('url-parse'); //Manages endpoints

var Library = require('./Library'); //Search into datasource
var bookCatalog = new Library(books); //Initialize object

var express = require('express');
var app = express();

app.get('/library/search',(request, response) =>{
    // var data = URL(request.url, true);
    // var lsEndPoint = data.pathname;
    var lsParams = request.query;
    var STATUS = 200;
    var lResult = {};
    var result = bookCatalog.Search(lsParams);
    lResult = result['RESULT'];
    STATUS = result['STATUS'];
    console.log(' Status: ' + STATUS);
    EndConnection(lResult, STATUS, response);
});

app.listen(666);

function EndConnection( result, status, connection)
{
    connection.statusCode = status; 
    connection.end(JSON.stringify(result));
}