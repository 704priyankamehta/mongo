var registration=require('../mongodb/registraion')

function logindata(req,res){
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
      return res.status(200).send(req.session.user);
    })};
    
function sessions(req,res){
        if(!req.session.user){
          return res.status(401).send("session is over");
      
        }
        return res.status(200).send("session running")
      
      }

      module.exports={
          logindata,
          sessions
      }