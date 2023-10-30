const themeDao = require("../modules/theme-dao.js");
const imageDao = require("../modules/image-dao.js");


async function getThemeOptions(){
    const options = await themeDao.retrieveAllThemeData();
    return options;
}

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

module.exports = {
    getThemeOptions,
    fetchAllArticleDetails
};
