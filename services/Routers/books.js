const express = require('express');
var router = express.Router();
var Books = require('../Models/books');

router.get('/', async (req, res)=>{
    try{
        var params = req.query;
        var id = params.id ? parseInt (params.id) : 0;
        var max = params.max ? parseInt(params.max) : 10;

        var books = await Books.find({
            id: {$gte: id},
        }).sort({id: 1}).limit(max);
        
        res.json(books);
    }catch(error){
        res.send(error);
    }
});
router.get('/author/:name', async (req, res)=>{
    try{
        var params = req.query
        var id = params.id ? parseInt (params.id) : 0;
        var max = params.max ? parseInt(params.max) : 10;
        var author = req.params.name.replace(/\s+/g, ' ');

        var books = await Books.find({
            id: {$gte: id},
            author: { $regex: '(?i)'+ author}
        }).sort({id: 1}).limit(max);

        res.json(books);
    }catch (error){
        res.send(error);
    }
});
router.get('/title/:title', async (req, res)=>{
    try{
        var params = req.query
        var id = params.id ? parseInt (params.id) : 0;
        var max = params.max ? parseInt(params.max) : 10;
        var title = req.params.title.replace(/\s+/g, ' ');

        var books = await Books.find({
            id: {$gte: id},
            title: { $regex: '(?i)'+ title}
        }).sort({id: 1}).limit(max);

        res.json(books);
    }catch (error){
        res.send(error);
    }
});
router.get('/book/:id', async (req, res)=>{
    try{
        var id = parseInt(req.params.id);
        var result = await Books.findOne({id: id});
        if(result){
            res.send({
                status: 'Ok',
                data: result
            });
        }else{
            res.send({
                warning: 'No book for id [' + id + ']'
            });
        }
    }catch (error){
        res.send(error);
    }
});
router.post('/create/:id', async (req, res)=>{
    try{
        var book = req.body;
        var id = parseInt(req.params.id);
        var exist = await Books.findOne({id: id});
        if(exist){
            res.send({
                warning: 'The id ' + id + ' already exists for a book',
                message:'Found book ' + book.title,
                tip: 'If you want to edit the book ' + id + 'go to edit'
            });
        }else{
            book.id = id; 
            var result = await Books.create(book);
            res.send({
                status: 'Ok',
                message: 'Succesfully created book ['+id+']',
                result: result
            });
        }

        res.send(books);
    }catch(error){
        res.send(error);
    }
});
router.put('/update/:id', async (req, res)=>{
    try{
        var book = req.body;
        var id = parseInt(req.params.id);
        var exist = await Books.findOne({id: id});
        if(exist){
            var result = await Books.update({id: id}, book);
            res.send({
                status: 'Ok',
                message: 'Book updated', 
                response: result
            });
        }
        else{
            res.send({
                message: 'The id ['+id+'] doesn\'t exist for a book',
                tip: 'Please, create the book first'
            });  
        }
    }catch(error){
        res.send(error);
    }
});
router.delete('/delete/:id', async (req, res)=>{
    try{
        var book = req.body;
        var id = parseInt(req.params.id);
        var exist = await Books.findOne({id: id});
        if(exist){
            var result = await Books.deleteOne({id: id});
            res.send({
                status: 'Ok',
                message: 'Book deleted', 
                response: result
            });
        }
        else{
            res.send({
                message: 'The id ['+id+'] doesn\'t exist for a book',
                tip: 'Please, create the book first'
            });  
        }
    }catch(error){
        res.send(error);
    }
});



module.exports = router;