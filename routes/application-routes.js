const express = require("express");
const router = express.Router();

const articleDao = require("../modules/article-dao.js");
const article = require("../modules/article-module.js");
const userDao = require("../modules/user-dao.js");
const bcrypt = require('bcrypt');

 router.get("/", async function (req, res) {
    res.locals.homePage = true;
    const sortby = req.query.sortby;
    const user = res.locals.user;
    
     let allArticles = [];
     if (sortby == "asc") {
         res.locals.asc = true;
         allArticles = await articleDao.retrieveAllArticlesAsc();
     } else {
         res.locals.desc = true;
         allArticles = await articleDao.retrieveAllArticlesDesc();
     }
     await article.fetchAllArticleDetails(allArticles, user);
   
     res.locals.allArticles = allArticles;
     res.render("home");
 
 });

router.post("/processPassword", async function(req, res){
    try{ const password = req.body.password;
        const hash = await bcrypt.hash(password,10);
        console.log(hash);
    } catch(e){
        console.log(e);
        res.status(500).send("Something Broke")
    }    
    })

 

//router to test whether password function worked
router.get("/password", async function(req, res) {

     res.render("password");
});


module.exports = router

