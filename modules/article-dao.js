const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

/**
 * Inserts the given article into the database. 
 * Then, return the ID which the database auto-assigned
 * 
 * @param article the article to insert
 */
async function addArticle(article) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into article (title, content, time, themeId) 
        values(${article.title}, ${article.content}, datetime('now'),${article.themeId})`);

    // Get the auto-generated ID value, and return it back.
    return result.lastID;
}

async function retrieveAllArticles() {
    const db = await dbPromise;

    const allArticles = await db.all(SQL`select * from article order by time desc`);

    return allArticles;
}


async function retrieveAllArticlesByUserId(userId) {
    const db = await dbPromise;

    const allArticles = await db.all(SQL`select a.* from article as a , user_article as ua 
        where ua.userId =${userId} and a.id = ua.articleId order by a.time desc;`);

    return allArticles;
}

async function deleteArticleByArticleId(articleId) {
    const db = await dbPromise;

    const result = await db.run(SQL`delete from article where id = ${articleId};`);

    return result;
}

async function retrieveArticlebyArticleId(articleId) {
    const db = await dbPromise;
    const article = await db.get(SQL`select * from article where id = ${articleId}`);
    return article;
}

async function updateArticleByArticleId(article) {
    const db = await dbPromise;

    const result = await db.run(SQL`update article 
        set title = ${article.title},
            themeId = ${article.themeId},
            time = datetime('now'),
            content = ${article.content}
        where id = ${article.id};`);

    return result;
}


// Export functions.
module.exports = {
    addArticle,
    retrieveAllArticles,
    retrieveAllArticlesByUserId,
    deleteArticleByArticleId,
    retrieveArticlebyArticleId,
    updateArticleByArticleId

};