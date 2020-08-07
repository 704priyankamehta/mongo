const mongoose  = require("mongoose");
 var Schema=mongoose.Schema;

var user=new Schema({
    name:{type:String,
        required:true,
        index:{
            unique:true
        }},
        email:{type:String,required:true,
            index:{unique:true}},
    password:{type:String ,required:true,index:{
            unique:true
        }}
});

var registration=mongoose.model('registration',user);



module.exports=registration;
