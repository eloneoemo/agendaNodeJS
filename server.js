const express = require('express');
const session = require('express-session');
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
app.use(session({
    secret: 'secret-key',
    cookie:{maxAge: 36000000},
    resave: false,
    saveUninitialized: true
}));

let connection = mongoose.connect('mongodb://localhost:27017/dbagenda',{useNewUrlParser: true,useUnifiedTopology: true});

app.post('/login',(req,res)=>{
    let user = req.body.user;
    let passw = req.body.pass;
    let sessionUser = req.session;
    User.find({
        correo: user
    }).countDocuments({},function(err,count){
        if(err){
            res.status(500);
            res.send(err);
        }else{
            if (count==1){
                User.find({correo:user,passw:passw}).countDocuments({},function(err,count){
                    if(err){
                        res.status(500);
                        res.send(err);
                    }else{
                        if(count == 1){
                            sessionUser.user = req.body.user;
                            res.send('Validado')
                        }else{
                            res.send('Usuario y/o Contraseña Incorrectos');
                        }
                    }
                })
            }else{
                res.send('Usuario no Registrado');
            }
        }
    })
});
app.post('/logout',function(req,res){
    req.session.destroy(function(error){
        if(error){
            console.log(error)
            res.send(error)
        }else{
            req.session = null
            res.send('logout')
            res.end()
        }
    })
})
app.use('/events', Route);
let PORT = 3000;
app.listen(PORT,()=>{
    console.log('Escuchando en el puerto: '+PORT)
})