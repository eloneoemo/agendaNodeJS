const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Route = require('./routes');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const User = require('./model/user');

http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./client'));

mongoose.connect('mongodb://localhost:27017/dbagenda',{useNewUrlParser: true,useUnifiedTopology: true});

app.post('/login',(req,res)=>{
    let user = req.body.user;
    let passw = req.body.pass
    User.find({
        correo: user,
        passw: passw 
    }).exec((error, result)=>{
        if(error)console.log('Error: '+error);
        if(result != 0){
            res.send({response:'Validado'})
        }
    })
})
app.use('/events', Route);
let PORT = 3000;
app.listen(PORT,()=>{
    console.log('Escuchando en el puerto: '+PORT)
})