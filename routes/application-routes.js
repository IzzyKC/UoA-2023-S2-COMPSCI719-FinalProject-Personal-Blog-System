const express = require("express");
const router = express.Router();

const articleDao = require("../modules/article-dao.js");
const article = require("../modules/article-module.js");
const userDao = require("../modules/user-dao.js");
const bcrypt = require('bcrypt');



router.get("/", async function(req, res) {
    res.locals.title = "Philanthropic-Polar-Bears";

    const userId = req.body.userId;
    const userName = req.body.userName;
    const password = req.body.password;
    const authToken = req.body.authToken;

    const user = await userDao.retrieveNewUserDetails(userId, userName, password, authToken);

    //set up default browse article(log in or not) 
    res.locals.homePage = true;
    const sortby = req.query.sortby;
    
     let allArticles = [];
     if (sortby == "asc") {
         res.locals.asc = true;
         allArticles = await articleDao.retrieveAllArticlesAsc();
     } else {
         res.locals.desc = true;
         allArticles = await articleDao.retrieveAllArticlesDesc();
     }
     await article.fetchAllArticleDetails(allArticles, user.id);
     res.locals.allArticles = allArticles;


     res.render("home");
     
 });


 router.get("/allArticles", async function (req, res) {
    res.locals.homePage = true;
    const sortby = req.query.sortby;
    const user = {
         id: 3,
         username: "I am a test string"
    };//TO DO delete test data res.locals.user;
    
     let allArticles = [];
     if (sortby == "asc") {
         res.locals.asc = true;
         allArticles = await articleDao.retrieveAllArticlesAsc();
     } else {
         res.locals.desc = true;
         allArticles = await articleDao.retrieveAllArticlesDesc();
     }
     await article.fetchAllArticleDetails(allArticles, user.id);
   
     res.locals.allArticles = allArticles;
     res.render("home");
 
 });

router.post("/processPassword", async function(req, res){
    try{ const password = req.body.password;
        const hash = await bcrypt.hash(password,10);
        console.log(hash);
    } catch(e){
        console.log(e);
        res.status(500).send("Password not added")
    }    
    })

 

//router to test whether password function worked
router.get("/password", async function(req, res) {

     res.render("password");
});


module.exports = router

