const themeDao = require("../modules/theme-dao.js");
const imageDao = require("../modules/image-dao.js");
const userArticleDao = require("../modules/user_article-dao.js");
const commentDao = require("../modules/comment-dao.js");

async function getThemeOptions(){
    const options = await themeDao.retrieveAllThemeData();
    return options;
}

async function fetchAllArticleDetails(allArticles, user){
    for(let article of allArticles){
        //await retrieveArticleDetails(article);
        const themeName = await themeDao.retrieveNameById(article.themeId);
        article.themeName = themeName.name;
        const allImages = await imageDao.retrieveAllImagesByArticleId(article.id);
        article.images = allImages;
        if(user){
            const userLike = await userArticleDao.retrieveUserLike(user.id, article.id);
            article.userlike = (userLike) ? true : false;
        }
        const comments = await commentDao.retrieveCommentByArticleId(article.id);
        article.comments = comments;
        console.log(article);
    }
}

module.exports = {
    getThemeOptions,
    fetchAllArticleDetails,
};

