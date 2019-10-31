const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    nombre: {type:String , required:true, unique:true},
    correo:{type:String , required:true},
    passw:{type:String , required:true},
    fechaNacimiento:{type:String,required:true}
})

let User = mongoose.model('Usuario',UserSchema);

module.exports = User;






