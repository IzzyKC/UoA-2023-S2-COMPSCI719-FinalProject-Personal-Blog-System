const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

/**
 * Inserts the given user-article data into the database. 
 * 
 * @param article the article to insert
 */
async function userAddLike(userId, articleId) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into user_article (userId, articleId) values(${userId}, ${articleId});`);
    return result;
}

async function userDeleteLike(userId, articleId) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        delete from user_article where userId = ${userId} and articleId = ${articleId};`);
    return result;
}

async function retrieveUserLike(userId, articleId) {
    const db = await dbPromise;
    const userLike = await db.get(SQL`select * from user_article where userId = ${userId} and articleId = ${articleId};`);
    return userLike;

}

// Export functions.
module.exports = {
    userAddLike,
    userDeleteLike,
    retrieveUserLike
};