var express = require('express');
var data = require("../modules/data");
var router = express.Router();




router.get('/login', data.getdata);
router.post('/registration', data.createdata);
router.post('/registration/:id', data.createlogin);
router.put('/registration/:id', data.updatedata);
router.patch('/registration/:id', data.updatepatchdata);
router.delete('/registration/:id', data.deletedata);
router.get('/session',data.sessions);


module.exports = router;
