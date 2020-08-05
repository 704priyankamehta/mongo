const registration = require("../mongodb/registraion");
const { count } = require("console");


async function checkuserExit(userId, user) {
    const result = await registration.findById(userId, function (err) {
        if (err) {
            res.send(404);
        }
    });
    if (user.password == result.password && user.userId == result.userId) {
        var userExit = 1;
        return userExit;
    }
    else {
        var userExit = -1;
        return userExit;
    }
}

async function getdata(req, res, next) {
    const user = req.body;
    const userId = req.params.id;
    await registration.findById(userId, function (err, result) {
        if (err) {
            res.send(404);
        }
        else if (user.password == result.password && user.userId == result.userId) {
            res.send(200, result)
        }
        else {
            res.send(404, { message: "incorrect userId or password" });
        }

    })
}
const createdata = async function (req, res, next) {
    const newUser = new registration(req.body);
    const response = await newUser.save();
    res.send(201, response);

}
const createlogin = async function (req, res, next) {
    const user = req.body;
    const userId = req.params.id;
    const response = await registration.findByIdAndUpdate(userId, user);
    res.send(200, response);

}
const updatedata = async function (req, res, next) {
    let user = req.body;
    const userId = req.params.id;
    var userExit = await checkuserExit(userId, user);

    if (userExit == -1) {
        return res.send("incorrect userId or password");
    }
    const response = await registration.findByIdAndUpdate(userId, user);
    req.session.user=response;
    res.send(200, response);

}
const updatepatchdata = async function (req, res, next) {
    let user = req.body;
    const userId = req.params.id;
    var userExit = await checkuserExit(userId, user);
    console.log(userExit);
    if (userExit == -1) {
        return res.send("incorrect userId or password");
    }
    const response = await registration.findByIdAndUpdate(userId, { $set: user });
    req.session.user=response;
    res.send(200, response);
}
const deletedata = async function (req, res, next) {
    const userId = req.params.id;
    let user = req.body;
    var userExit = await checkuserExit(userId, user);
    console.log(userExit);
    if (userExit == -1) {
        return res.send("incorrect userId or password");
    }
    await registration.findByIdAndRemove(userId)
    req.session.user=response;
    res.send(200, { message: "deleted" });
};
function sessions(req,res){
    if(!req.session.user){
      return res.status(401).send("session is over");
  
    }
    return res.status(200).send("session running")
  
  }


module.exports = {
    getdata,
    createdata,
    updatedata,
    deletedata,
    updatepatchdata,
    createlogin,
    sessions
}