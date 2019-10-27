
const Route =  require('express').Router();

const path = require('path');


Route.get('/',(req,res)=>{
    res.send('Hola Mundo');
});

module.exports = Route;