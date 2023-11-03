const themeDao = require("../modules/theme-dao.js");
const imageDao = require("../modules/image-dao.js");
const userArticleDao = require("../modules/user_article-dao.js");
const commentDao = require("../modules/comment-dao.js");

async function getThemeOptions(){
    const options = await themeDao.retrieveAllThemeData();
    return options;
}

async function fetchAllArticleDetails(allArticles, user, pageIndex){
    for(let article of allArticles){
        //await retrieveArticleDetails(article);
        const themeName = await themeDao.retrieveNameById(article.themeId);
        article.themeName = themeName.name;
        const allImages = await imageDao.retrieveAllImagesByArticleId(article.id);
        article.images = allImages;
        if(user){
            const userLike = await userArticleDao.retrieveUserLike(user.id, article.id);
            article.userlike = (userLike) ? true : false;
            const comments = await commentDao.retrieveCommentByArticleId(article.id);
            article.comments = comments;  
            article.likable = true;
            article.commentable = true;
        }

        article.userArticle = (user && article.userId == user.id) ? true :false;
        article.pageIndex = pageIndex;
        console.log(article); 
    }
}

function getNextPage(pageIndex){

    if(pageIndex == "F"){
        return "/yourFavorites";
    }else if(pageIndex == "P"){
        return "/yourArticles";
    }else{
        return "/allArticles";
    }
}

module.exports = {
    getThemeOptions,
    fetchAllArticleDetails,
    getNextPage
};

