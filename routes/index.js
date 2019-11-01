
const Route =  require('express').Router();
const Evento = require('../model/events'); 
const path = require('path');
const User = require('../model/user');
let ObjectId = require('mongoose').Types.ObjectId;


Route.get('/all',(req,res)=>{    
    req.session.reload(function(err){
        if(err){
            res.status(500)
            res.send('Hubo un error');
            res.end()
        }else{
            if(req.session.user){
                User.find({
                    correo:req.session.user
                }).exec({},function(error,doc){
                    Evento.find({
                        user:doc[0]._id
                    }).exec({},function(error,docu){
                        res.status(200)
                        res.json(docu)
                        res.end()
                    })
                })
            }else{
                res.status(500)
                res.send('Hubo un error');
                res.end()
            }
        }
        
    })
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
                    userId = doc[0]._id;

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
                        res.send('Registro añadido')
                    }
                })

            })
        }
    })
})

Route.post('/delete/:id',(req,res)=>{
    let id = req.params.id;
    req.session.reload(function(error){
        if(error){
            res.status(500);
            res.send('Ocurrio el siguiente error:'+error);
            res.end()
        }else{
            if(req.session.user){
                Evento.deleteOne({_id:id},function(err,res){
                    if(err){
                        console.log(err)
                    }else{
                        console.log(res)
                        res.send('Registro eliminado')
                        res.end()
                    }
                })
            }
        }
    })

})
Route.post('/update/:id&:start&:end',(req,res)=>{
    req.session.reload(function(error){
        if(error){
            res.status(500)
            res.send('logout')
            res.end()
        }else{
            if(req.session.user){
                let idToUpdate = parseInt(req.params.id);                
                    let start= req.params.start
                    let end= req.params.end    
                Evento.find({_id:idToUpdate}).exec((error,result)=>{
                    Evento.update({_id:idToUpdate},{start:start,end:end},function(err,response){
                        if(err){
                            console.log(err)
                        }else{
                            console.log(response)
                        }    
                    })
                })
            }else{
                res.status(500)
                res.send('logout')
                res.end()
            }
        }
    })
})
module.exports = Route;