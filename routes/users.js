var express = require('express');
var data = require("../modules/data");
var router = express.Router();




router.post('/login' ,data.get);
router.post('/registration',data.createdata);
router.get('/login',data.checkSession ,data.getdata);
router.put('/registration/:id',data.checkSession , data.updatedata);

router.delete('/registration/:id',data.checkSession , data.deletedata);



module.exports = router;
