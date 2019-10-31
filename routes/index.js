
const Route =  require('express').Router();
const Evento = require('../model/events');
const path = require('path');
const User = require('../model/user');
let ObjectId = require('mongoose').Types.ObjectId;


Route.get('/all',(req,res)=>{
    req.session.reload(function(error){ 
        let a = req.session.user;  
        res.send('Hola Mundo'+a)     
            /*if(req.session.user){
                if(error){
                    res.send('logout');
                    res.end()
                }else{
                User.findOne({user: req.session.user}).exec({},function(error,doc){
                    if(error){
                        res.send('logout');
                    }else{
                        Evento.find({user: doc._id}).exec(function(error, doc){
                            if(error){
                                res.status(500)
                                res.send(error)
                            }
                            res.json(doc)
                        })
                    }
                })
            }
            }*/
        }
    )
    
}) // aqui finaliza el get /all

Route.post('/new',(req, res)=>{
    req.session.reload(function(error){
        if(error){
            res.status(500)
            res.send(error)
        }else{
            User.find({correo:req.session.user}).exec({},(error,doc)=>{
                Evento.nextCount((err,count)=>{
                    idNew = count
                });
                let title = req.body.title,
                    start = req.body.start,
                    end = req.body.end,
                    userId = doc._id;

                let nuevoEvento = new Evento({
                    title:title,
                    start:start,
                    end:end,
                    user:userId
                })

                nuevoEvento.save(function(error){
                    if(error){
                        console.log(error)
                    }else{
                        res.json(idNew)
                    }
                })

            })
        }
    })
})
module.exports = Route;