
const Route =  require('express').Router();
const Evento = require('../model/events');
const path = require('path');


Route.get('/',(req,res)=>{
    res.send('Hola Mundo');
});
Route.post('/new',(req,res)=>{

    
})
module.exports = Route;