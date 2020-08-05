const mongoose  = require("mongoose");
 var Schema=mongoose.Schema;

var user=new Schema({
    name:String,
    age:Number,
    email:String,
   
    userId:{type:String,unique:true},
    password:String 
});
var registration=mongoose.model('registration',user);



module.exports=registration;