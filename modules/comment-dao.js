const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function addNewComment(comment) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into comment(content, time, articleId, userId) values
        (${comment.content} , dateTime('now'), ${comment.articleId}, ${comment.userId});`);

    return result;
}

async function retrieveCommentByArticleId(articleId) {
    const db = await dbPromise;
    const comments = await db.all(SQL`select c.*, u.username from comment as c, user as u 
    where articleId = ${articleId} and c.userId = u.id;`);
    return comments;

}


// Export functions.
module.exports = {
    addNewComment,
    retrieveCommentByArticleId
};