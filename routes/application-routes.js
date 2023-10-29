const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer-uploader.js");
const fs = require("fs");
const testDao = require("../modules/test-dao.js");
const themeDao = require("../modules/theme-dao.js");
const articleDao = require("../modules/article-dao.js");
const user_articleDao = require("../modules/user_article-dao.js");
const imageDao = require("../modules/image-dao.js");


    res.locals.title = "My route title!";
    res.locals.allTestData = await testDao.retrieveAllTestData();


    res.render("home");
});

router.get("/allArticles", async function(req, res) {
    res.locals.homePage = true;
    res.locals.owner = "All";
    const allArticles = await articleDao.retrieveAllArticles();
    for(let article of allArticles){
        await retrieveArticleDetails(article);
    }
    //console.log(allArticles);
    res.locals.allArticles = allArticles;
    res.render("all-articles");

});

router.get("/yourArticles", async function(req, res) {
    user = {
        id: 2,
        username: "I am a test string"
    };//
    res.locals.owner = user.username;
    res.locals.homePage = false;
    const allArticles = await articleDao.retrieveAllArticlesByUserId(user.id);
    for(let article of allArticles){
        await retrieveArticleDetails(article);
    }
    //console.log(allArticles);
    res.locals.allArticles = allArticles;
    res.render("all-articles");

});


router.get("/addArticle", async function(req, res) {
    res.locals.action = "ADD";
    res.locals.themeOptions = await getThemeOptions();
    res.render("edit-article");
});


router.post("/saveArticle", upload.array("imageFiles",15), async function(req, res) {
    const pageAction =req.body.inpaction;
    const article = {
        title: req.body.title,
        content: req.body.article,
        themeId: req.body.theme
    }
    const user = res.locals.user;//TO-DO merge log in function, get user data
    try{
        let articleId;
        if(pageAction == "ADD"){
            //insert article data to db
            console.log("insert article");
            console.log(article);
            articleId = await articleDao.addArticle(article);
            console.log(article);
            //insert user_article relation to db
            const data = {
                userId: 2,//TO-DO connect user data after log in func complete
                articleId : articleId
            }
            console.log("insert user-article");
            await user_articleDao.userAddArticle(data);
        }else if(pageAction == "EDIT"){
            articleId = req.body.articleId;
            article.id = articleId;
            console.log(article);
            //update article table
            await articleDao.updateArticleByArticleId(article);

            //delete image
            let deleteImages = req.body.deleteImgs;
            deleteImages = deleteImages.slice(0, deleteImages.lastIndexOf(","));
            const deleteArray = deleteImages.split(",");
            console.log(deleteArray);
            for(let id of deleteArray){
                await imageDao.deleteImageById(id);
            }
        }

        //save imageFiles to server and insert image data to db
        console.log("insert new image");
        const fileInfoArray = req.files;
        for(let fileInfo of fileInfoArray){
            // Move the image into the images folder
            const oldFileName = fileInfo.path;
            const newFileName = `./public/images/${articleId}-${fileInfo.originalname}`;
            fs.renameSync(oldFileName, newFileName);
            //insert db
            const image = {
                path: `./images/${articleId}-${fileInfo.originalname}`,
                articleId : articleId
            }
            const addImageResult = await imageDao.addImage(image);
            console.log(addImageResult);
        }

        res.setToastMessage(`${pageAction} article successsfully!`)
        res.redirect("/yourArticles");

    }catch(error){
        console.log(error);
        res.setToastMessage(`${pageAction} new article failed! [$error]`)
        res.render("edit-article");
    }
});

router.get("/backToYours", function(req, res) {
    res.redirect("/yourArticles");
});

router.post("/editArticle", async function(req, res) {
    res.locals.action = "EDIT";
    res.locals.edit =true;
    const articleId = req.body.articleInfo;
    res.locals.articleId = articleId;
    res.locals.themeOptions = await getThemeOptions();
    res.locals.uploadedImages = await imageDao.retrieveAllImagesByArticleId(articleId);
    res.render("edit-article");
});

router.post("/deleteArticle", async function(req, res) {
    const articleId = req.body.articleId;
    console.log(articleId);
    try{
        await articleDao.deleteArticleByArticleId(articleId);
        res.setToastMessage(`delete article(id:${articleId}) successfully!`);
    }catch(error) {
        res.setToastMessage(`delete article(id:${articleId}) failed! [$error]`);
    }
    res.redirect("/yourArticles");
});

router.get("/getArticleInfo/:articleId", async function(req, res){
    const articleId = req.params.articleId;
    let articleInfo = await articleDao.retrieveArticlebyArticleId(articleId);
    //console.log(articleInfo);
    //await retrieveArticleDetails(articleInfo);
    if(articleInfo){
        res.status(200).json(articleInfo);
    }else{
        //res.sendStatus(404);
        res.status(404).send({result:`article (id:${articleId}) not Found!`});
    }
});

async function retrieveArticleDetails(article){
    const themeName = await themeDao.retrieveNameById(article.themeId);
    article.themeName = themeName.name;
    const allImages = await imageDao.retrieveAllImagesByArticleId(article.id);
    article.images = allImages;
    console.log(article);
}

async function getThemeOptions(){
    const options = await themeDao.retrieveAllThemeData();
    return options;
}
router.get("/password", async function(req, res) {

     res.render("password");
});

 const userDao= require("../modules/users-dao.js");
const { retrieveAllUserData } = require("./practice dao");
router. get ("/", async function (req, res){

    const userId=req.body.userId;
    const userName=req.body.userName;
    const password=req.body.password;
    const authToken=req.body.authToken;

    const user= await userDao.retrieveAllUserData (userId, userName, password, authToken);

    res.render("home");

module.exports = router;
