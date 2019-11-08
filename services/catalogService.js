const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
const PORT = 6969;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:8069'
}));

mongoose.connect('mongodb://localhost:27017/IDFLibraryApp', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('DB conneted');
        console.log(mongoose.connection.host)
        console.log(mongoose.connection.port);
        //console.log(mongoose.connection.db);
    }
})

var bookRouter = require('./Routers/books');
app.use('/catalog', bookRouter);


app.listen(PORT, ()=>{
    console.log('Server is up and running');
})