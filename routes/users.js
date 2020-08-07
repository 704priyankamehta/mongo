var express = require('express');
var data = require("../modules/data");
var router = express.Router();
function validation(req,res,next){
    var email = req.body.email;
    var password = req.body.password;
    if(!email || !password){
        return res.send("required email or password");
     }
      next();
}
router.post('/login' ,validation,data.get);
router.post('/registration',data.createdata);
router.get('/login/:id',data.checkSession ,data.getdata);
router.put('/registration/:id',data.checkSession , data.updatedata);
router.delete('/registration/:id',data.checkSession , data.deletedata);



module.exports = router;
