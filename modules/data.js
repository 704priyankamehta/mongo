const registration = require("../mongodb/registraion");
const { count } = require("console");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
var jwt = require('jsonwebtoken');


function checkSession(req, res, next) {
    //if(!req.session.user){
    //return res.status(401).send("login first");
    //}
    //res.status(200).send(req.session.user)
    const token = req.headers.authorization.split(" ")[1];
    try{
    console.log(token);

    var decode=jwt.verify(token,'shhhhh');
    console.log(decode._doc);
    next();
}catch(err){
        res.status(401).send("invalid token");
    }
}

async function checkuserExit(userId, user) {
    const result = await registration.findById(userId, function (err) {
        if (err) {
            res.send(404);
        }
    });
    if (user.email == result.email) {
        var userExit = 1;
        return userExit;
    }
    else {
        var userExit = -1;
        return userExit;
    }
}

async function get(req, res) {
   
    var email = req.body.email;
    var password = req.body.password;
    if(!email || !password){
        return res.send("required email or password");
     } 
   
    const user = await registration.findOne({ email: email })
    if (!user) {
        res.send(404,"no user found");
    }
    bcrypt.compare(password, user.password, function (err,result) {
        if (err) {
            res.send("incmplete data");
        }
        if (result == false) {
            return res.send("invalid email or id");

        }
        else {
            var token = jwt.sign({ ...user, _id: user._id.toString() }, 'shhhhh');
            //req.session.user = user;
            
            return res.status(200).json({message:"logged in sucessfully",token:token});

        }
    })

}
async function getdata(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if(!email || !password){
       return res.send("required email or password");
    } 

    const user = await registration.findOne({ email: email })
    if (!user) {
        res.send(404,"no user found");
    }
    bcrypt.compare(password, user.password).then(function (result) {
        if (result == true) {
            //req.session.user = user;
            
            return res.status(200).send(user);
        }
        else {
            return res.send("invalid email or id");
        }
    }).catch(err=>res.send("incomplete data"));


}
const createdata = async function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            res.send("password required");
        }
        var newUser = new registration({
            name: name,
            email: email,
            password: hash

        });
        newUser.save().then(doc => res.send("resgistered")).catch(err => res.send(err));
    });
}

const updatedata = async function (req, res, next) {
    let user = req.body;
    const userId = req.params.id;
    var userExit = await checkuserExit(userId, user);
    console.log(userExit);
    if (userExit == -1) {
        return res.send("user not exit");
    }
    const response = await registration.findByIdAndUpdate(userId, user);
    //req.session.user = response;
    res.send(200);

}

const deletedata = async function (req, res, next) {
    const userId = req.params.id;
    let user = req.body;
    var userExit = await checkuserExit(userId, user);
    console.log(userExit);
    if (userExit == -1) {
        return res.send("user not exit");
    }
    await registration.findByIdAndRemove(userId)
    //req.session.user = response;
    res.send(200, { message: "deleted" });
};


module.exports = {
    getdata,
    createdata,
    updatedata,
    deletedata,

    get,
    checkSession


}
