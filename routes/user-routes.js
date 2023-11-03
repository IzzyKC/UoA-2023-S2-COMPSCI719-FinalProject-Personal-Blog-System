const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();

const userDao = require("../modules/user-dao.js");
const bcrypt = require('bcrypt');

router.get("/login", function (req, res) {

    if (res.locals.user) {
        res.redirect("/");
    }

    else {
        res.render("login");
    }

});

router.post("/login", async function (req, res) {

    // Get the username and password submitted in the form
    const username = req.body.username;
    const password = req.body.password;

    // Find a matching user in the database
    const user = await userDao.retrieveUserWithCredentials(username, password);
    const dbPassword = (user) ? user.password : bcrypt.genSaltSync(10);
    console.log(user);
    bcrypt.compare(password, dbPassword, async (err, data) => {
        //if error than throw error
        if (err) throw err

        //if both match than you can do anything
        if (data) {
            if (user) {
                // Auth success - give that user an authToken, save the token in a cookie, and redirect to the homepage.
                const authToken = uuid();
                user.authToken = authToken;
                await userDao.updateUserToken(user);
                res.cookie("authToken", authToken);
                res.locals.user = user;
                res.redirect("/allArticles");
            }
        } else {
            // Auth fail
            res.locals.user = null;
            if(user == null || user == undefined) {
                res.setToastMessage("Authentication failed! Username not found!");
            }else{
                res.setToastMessage("Authentication failed! Password does not match!");
            }
            res.redirect("./login");
        }

    });
    
});

router.get("/logout", function (req, res) {
    res.clearCookie("authToken");
    res.setToastMessage(`See you next time, ${res.locals.user.username}!`);
    res.redirect("./login");
});

router.get("/newAccount", function(req, res) {
    res.render("new-account");

});

router.post("/newAccount", async function(req, res) {
    const hashPassword = await bcrypt.hash( req.body.password , 10 );

    const user = {
        username: req.body.username,
        password: hashPassword,
        name: req.body.name,
        birth: req.body.birth,
        description: req.body.description,
        icon: req.body.avatar
    };
    console.log(user);

    try{
        userDao.addNewUser(user);
        res.setToastMessage("Account created successfully!");
        res.redirect("./login");

    }catch(error){
        console.log(error);
        res.setToastMessage(`create new account fails: username has been taken!`)
        //res.redirect("./newAccount");
        return;
    }
    
});

router.get("/checkDuplicatedUsername/:username" , async function(req, res) {
    const username = req.params.username;
    try{
        const result = await userDao.retrieveUserByUsername(username);
    //console.log(result);
        return res.status(200).send({ result });
    }catch(error){
        return res.status(404).send({ result: `${error}` });
    }
});

module.exports = router