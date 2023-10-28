const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");

router.get("/", async function(req, res) {

    res.locals.title = "My route title!";
    res.locals.allTestData = await testDao.retrieveAllTestData();


    const userDao= require("../modules/users-dao.js");
const { retrieveAllUserData } = require("./practice dao");
router. get ("/login", async function (req, res){

    const userId=req.body.userId;
    const userName=req.body.userName;
    const password=req.body.password;
    const authToken=req.body.authToken;

    const user= await userDao.retrieveAllUserData (userId, userName, password, authToken);

    res.render("home");
});

module.exports = router,
retrieveAllUserData
