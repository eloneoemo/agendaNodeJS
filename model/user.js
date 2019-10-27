const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userId: [Schema.Types.ObjectId],
    nombre: {type:String , required:true},
    correo:{type:String , required:true},
    passw:{type:String , required:true},
    fechaNacimiento:{type:String,required:true}
})

let User = mongoose.model('Usuario',UserSchema);

module.exports = User;






