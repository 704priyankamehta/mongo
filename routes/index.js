var express = require('express');
var router = express.Router();
const {user} = require("../mongodb/registraion");

async function validation(req,res,next){
const value=await user.validate(req.body);
if(value.error){
  res.status(409).send({message:"invalid field data"});


}else{
  next();
}
router.get('/gin', function (req,res,next) {
  var user=req.body
  res.send(user);
  
});
}
router.post('/login', validation,function(req, res, next) {
  var userId=req.body.userId;
  var password=req.body.password;

  registration.findOne({userId:userId,password:password},function(err,user){
    if(err){
      return res.send(err);

    }
    if(!user){
      return res.send(404,{message:"invalid user id or password"})
    }
    req.session.user=user;
    return res.status(200).send();
  })});

  router.post('/register', validation,async function(req, res, next) {
    const newUser = new registration(req.body);
    const response = await newUser.save();
    res.send(201, response);

    });
    



module.exports = router;
