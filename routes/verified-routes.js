const express = require("express");
const router = express.Router();

const { verifyAuthenticated } = require("../middleware/auth-middleware.js");
const upload = require("../middleware/multer-uploader.js");
const fs = require("fs");

const themeDao = require("../modules/theme-dao.js");
const articleDao = require("../modules/article-dao.js");
const user_articleDao = require("../modules/user_article-dao.js");
const imageDao = require("../modules/image-dao.js");
const article = require("../modules/article-module.js");

router.get("/allArticles", async function (req, res) {
    res.locals.homePage = true;
    res.locals.owner = "All";
    const sortby = req.query.sortby;
    let allArticles = [];
    if (sortby == "asc") {
        res.locals.asc = true;
        allArticles = await articleDao.retrieveAllArticlesAsc();
    } else {
        res.locals.desc = true;
        allArticles = await articleDao.retrieveAllArticlesDesc();
    }
    await article.fetchAllArticleDetails(allArticles);
    //console.log(allArticles);
    res.locals.allArticles = allArticles;
    res.render("all-articles");

});

//TO-DO add verifyAuthenticated
router.get("/yourArticles", async function (req, res) {
    user = {
        id: 3,
        username: "I am a test string"
    };
    const sortby = req.query.sortby;
    res.locals.owner = user.username;
    res.locals.homePage = false;
    let allArticles = [];
    if (sortby == "asc") {
        res.locals.asc = true;
        allArticles = await articleDao.retrieveAllArticlesByUserIdAsc(user.id);
    } else {
        res.locals.desc = true;
        allArticles = await articleDao.retrieveAllArticlesByUserIdDesc(user.id);
    }
    await article.fetchAllArticleDetails(allArticles);
    //console.log(allArticles);
    res.locals.allArticles = allArticles;
    res.render("all-articles");

});

//TO-DO add verifyAuthenticated
router.get("/addArticle", async function (req, res) {
    res.locals.action = "ADD";
    res.locals.themeOptions = await article.getThemeOptions();
    res.render("edit-article");
});

//TO-DO add verifyAuthenticated
router.post("/saveArticle", upload.array("imageFiles", 15), async function (req, res) {
    const pageAction = req.body.inpaction;
    const user = {
        id: 3,
        username: "TEST1"
    };//res.locals.user;//TO-DO merge log in function, get user data
    const themeId = (req.body.theme == '0') ? 999 : req.body.theme;
    const article = {
        title: req.body.title,
        content: req.body.article,
        themeId: themeId,
        userId: user.id
    }
    try {
        let articleId;
        if (pageAction == "ADD") {
            //insert article data to db
            console.log(article);
            articleId = await articleDao.addArticle(article);

        } else if (pageAction == "EDIT") {
            articleId = req.body.articleId;
            article.id = articleId;
            //update article table
            await articleDao.updateArticleByArticleId(article);

            //delete image
            let deleteImages = req.body.deleteImgs;
            deleteImages = deleteImages.slice(0, deleteImages.lastIndexOf(","));
            const deleteArray = deleteImages.split(",");
            for (let id of deleteArray) {
                await imageDao.deleteImageById(id);
            }
        }

        //save imageFiles to server and insert image data to db
        const fileInfoArray = req.files;
        for (let fileInfo of fileInfoArray) {
            // Move the image into the images folder
            const oldFileName = fileInfo.path;
            const newFileName = `./public/images/${articleId}-${fileInfo.originalname}`;
            fs.renameSync(oldFileName, newFileName);
            //insert db
            const image = {
                path: `./images/${articleId}-${fileInfo.originalname}`,
                articleId: articleId
            }
            await imageDao.addImage(image);
            //console.log(addImageResult);
        }

        res.setToastMessage(`${pageAction} article successsfully!`)

    } catch (error) {

        res.setToastMessage(`${pageAction} new article failed! ${error}`);
    }
    res.redirect("/yourArticles");
});

//TO-DO add verifyAuthenticated
router.get("/backToYours", function (req, res) {
    res.redirect("/yourArticles");
});

//TO-DO add verifyAuthenticated
router.post("/editArticle", async function (req, res) {
    res.locals.action = "EDIT";
    res.locals.edit = true;
    const articleId = req.body.articleInfo;
    res.locals.articleId = articleId;
    res.locals.themeOptions = await article.getThemeOptions();
    res.locals.uploadedImages = await imageDao.retrieveAllImagesByArticleId(articleId);
    res.render("edit-article");
});

//TO-DO add verifyAuthenticated
router.post("/deleteArticle", async function (req, res) {
    const articleId = req.body.articleId;
    console.log(articleId);
    try {
        await articleDao.deleteArticleByArticleId(articleId);
        res.setToastMessage(`delete article(id:${articleId}) successfully!`);
    } catch (error) {
        res.setToastMessage(`delete article(id:${articleId}) failed! ${error}`);
    }
    res.redirect("/yourArticles");
});

//TO-DO add verifyAuthenticated
router.get("/getArticleInfo/:articleId", async function (req, res) {
    const articleId = req.params.articleId;
    let articleInfo = await articleDao.retrieveArticlebyArticleId(articleId);
    //console.log(articleInfo);
    //await retrieveArticleDetails(articleInfo);
    if (articleInfo) {
        res.status(200).json(articleInfo);
    } else {
        //res.sendStatus(404);
        res.status(404).send({ result: `article (id:${articleId}) not Found!` });
    }
});

/*
async function fetchAllArticleDetails(allArticles){
    for(let article of allArticles){
        //await retrieveArticleDetails(article);
        const themeName = await themeDao.retrieveNameById(article.themeId);
        article.themeName = themeName.name;
        const allImages = await imageDao.retrieveAllImagesByArticleId(article.id);
        article.images = allImages;
        console.log(article);
    }
}


async function getThemeOptions(){
    const options = await themeDao.retrieveAllThemeData();
    return options;
}
*/

module.exports = router;