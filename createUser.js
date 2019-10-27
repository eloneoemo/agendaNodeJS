const mongoose = require('mongoose');
const User = require('./model/user');



mongoose.connect('mongodb://localhost:27017/dbagenda',{useNewUrlParser: true,useUnifiedTopology: true });

let user = new User ({
    userId: new mongoose.Types.ObjectId,
    nombre: "Josue Cespedes",
    correo:"josue@josue.com",
    passw:"1234",
    fechaNacimiento:"10/03/1993"
});

user.save((err)=>{
    if(err)console.log(err);
});