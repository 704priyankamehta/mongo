var express = require('express');
var data = require("../modules/data");
var router = express.Router();
var login=require('../modules/login')


router.get('/login', login.logindata);
router.get('/registration/:id', data.getdata);
router.post('/registration', data.createdata);
router.post('/registration/:id', data.createlogin);
router.put('/registration/:id', data.updatedata);
router.patch('/registration/:id', data.updatepatchdata);
router.delete('/registration/:id', data.deletedata);
router.get('/session',data.sessions);
router.get('/session',login.sessions);

module.exports = router;
