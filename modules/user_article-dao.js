const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

/**
 * Inserts the given user-article data into the database. 
 * 
 * @param article the article to insert
 */
async function userAddArticle(data) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into user_article (userId, articleId) values(${data.userId}, ${data.articleId});`);
    return result;
}

// Export functions.
module.exports = {
    userAddArticle
};