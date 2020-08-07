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

    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);

        var decode = jwt.verify(token, 'shhhhh');
        console.log(decode._doc);
        next();
    } catch (err) {
        res.status(401).send("invalid token");
    }
}


async function get(req, res) {

    var email = req.body.email;
    var password = req.body.password;
    const user = await registration.findOne({ email: email })
    if (!user) {
        res.send(404, "no user found");
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            res.send(404, "incmplete data");
        }
        if (result == false) {
            return res.send("invalid email or id");

        }
        else {
            var token = jwt.sign({ ...user, _id: user._id.toString() }, 'shhhhh',{expiresIn:'600'});
            return res.status(200).json({ message: "logged in sucessfully", token: token });

        }
    })

}
async function getdata(req, res) {
    let user = req.body;
    const userId = req.params.id;
    const response = await registration.findById(userId, user);
    if (!response) {
        res.send(404, "user not exit");
    }
    //req.session.user = response;
    res.send(200);

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
    const response = await registration.findByIdAndUpdate(userId, user);
    if (!response) {
        res.send(404, "user not exit");
    }
    //req.session.user = response;
    res.send(200);
}
const deletedata = async function (req, res, next) {
    const userId = req.params.id;
    var user = await registration.findByIdAndRemove(userId)
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
