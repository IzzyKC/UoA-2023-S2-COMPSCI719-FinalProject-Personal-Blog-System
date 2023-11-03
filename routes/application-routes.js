const express = require("express");
const router = express.Router();

const articleDao = require("../modules/article-dao.js");
const article = require("../modules/article-module.js");
const userDao = require("../modules/user-dao.js");
const bcrypt = require('bcrypt');

 router.get("/", async function (req, res) {
    res.locals.title = "philanthropic-polar-bears";
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
    await article.fetchAllArticleDetails(allArticles, user, "H");
   
    res.locals.allArticles = allArticles;
     
    res.render("home");
     
 });

 router.get("/replyToComment", verifyAuthenticated, async function(req, res) {
    const pageIndex = req.query.InpPageIndex;
    try {
        const user = res.locals.user;
        const articleId = req.query.inpArticleId;
        const content = req.query.inpComment;
        
        console.log(pageIndex);
        const comment = {
            content : content,
            articleId: articleId,
            userId: user.id
        };
        await commentDao.retrieveCommentByArticleId(articleId)
    } catch (error) {
        console.log(error);
        res.setToastMessage(`LEAVE A COMMENT FAILED : ${error}`);
    }
    res.redirect(article.getNextPage(pageIndex));
    
})

module.exports = router

