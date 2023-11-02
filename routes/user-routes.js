const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();

const userDao = require("../modules/user-dao.js");

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

    // if there is a matching user...
    if (user) {
        // Auth success - give that user an authToken, save the token in a cookie, and redirect to the homepage.
        const authToken = uuid();
        user.authToken = authToken;
        await userDao.updateUser(user);
        res.cookie("authToken", authToken);
        res.locals.user = user;
        res.redirect("/allArticles");
        
    }

    // Otherwise, if there's no matching user...
    else {
        // Auth fail
        res.locals.user = null;
        res.setToastMessage("Authentication failed!");
        res.redirect("./login");
    }
});

router.get("/logout", function (req, res) {
    res.clearCookie("authToken");
    res.setToastMessage(`See you next time, ${res.locals.user.username}!`);
    res.redirect("./login");
});

router.get("/newAccount", function(req, res) {
    res.render("./new-account");

});

router.post("/newAccount", function(req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    };
    try{
        userDao.createUser(user);
        res.setToastMessage("Account created successfully!");
        res.redirect("./login");
    }catch(error){
        res.setToastMessage("create new account fails: Username has benn taken!")
        res.redirect("./newAccount");
    }
    
});

router.get("/updateAccount", function(req, res) {

});

router.post("/saveUpdate", function(req, res) {
    
});

router.post("/deleteAccount", function(req, res) {

});




module.exports = router