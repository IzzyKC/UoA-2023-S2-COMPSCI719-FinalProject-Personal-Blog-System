const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

/**
 * Inserts the given user-article data into the database. 
 * 
 * @param article the article to insert
 */
async function userAddLike(data) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into user_article (userId, articleId) values(${data.userId}, ${data.articleId});`);
    return result;
}

async function userDeleteLike(data) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        delete from user_article where userId = ${data.userId} and articleId = ${data.articleId};`);
    return result;
}

// Export functions.
module.exports = {
    userAddLike,
    userDeleteLike
};