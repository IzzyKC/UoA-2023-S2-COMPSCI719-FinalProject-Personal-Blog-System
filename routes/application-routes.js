const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const articleDao = require("../modules/article-dao.js");
const article = require("../modules/article-module.js");

router.get("/", async function(req, res) {
     res.locals.title = "Philanthropic-Polar-Bears";
     //res.locals.allTestData = await testDao.retrieveAllTestData();

     res.locals.homePage = true;
     res.locals.owner = "All";
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
 
     //console.log(allArticles);
     res.locals.allArticles = allArticles;
     res.render("home");
 
     res.render("home");
 });


 router.get("/allArticles", async function (req, res) {
     res.locals.homePage = true;
     res.locals.owner = "All";
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
 
     //console.log(allArticles);
     res.locals.allArticles = allArticles;
     res.render("home");
 
 });

//router to test whether password function worked
router.get("/password", async function(req, res) {

     res.render("password");
});


module.exports = router;