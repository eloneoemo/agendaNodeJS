let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');
let User = require('./user');
let Schema = mongoose.Schema;  
const server = require('../server'); 

let EventsSchema = new Schema({
    title:{type: String, required:true},
    start:{type:String, required:true},
    end:{type:String, required:false},
    allDay:{type:String,required:false},
    user:{type:Schema.ObjectId, ref:'Usuario' }
})

let connection = mongoose.createConnection("mongodb://localhost:27017/dbagenda",{useNewUrlParser: true,useUnifiedTopology: true});

autoIncrement.initialize(connection);

EventsSchema.plugin(autoIncrement.plugin,{model:'Evento',startAt:1});

let EventModel = mongoose.model('Evento',EventsSchema);

module.exports = EventModel;