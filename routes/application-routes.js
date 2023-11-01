const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer-uploader.js");
const fs = require("fs");
const testDao = require("../modules/test-dao.js");
const themeDao = require("../modules/theme-dao.js");
const articleDao = require("../modules/article-dao.js");
const user_articleDao = require("../modules/user_article-dao.js");
const imageDao = require("../modules/image-dao.js");

router.get("/", async function(req, res) {
    res.locals.title = "Philanthropic-Polar-Bears";
    //res.locals.allTestData = await testDao.retrieveAllTestData();
    
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

router.get("/password", async function(req, res) {

     res.render("password");
});



module.exports = router;