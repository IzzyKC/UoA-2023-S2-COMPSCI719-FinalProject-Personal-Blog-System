const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const articleDao = require("../modules/article-dao.js");
const article = require("../modules/article-module.js");
const userDao = require("../modules/user-dao.js");



router.get("/", async function(req, res) {
    res.locals.title = "Philanthropic-Polar-Bears";
    //res.locals.allTestData = await testDao.retrieveAllTestData();

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

 

//router to test whether password function worked
router.get("/password", async function(req, res) {

     res.render("password");
});


module.exports = router

