const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function addNewComment(comment) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into comment(content, time, articleId, userId) values
        (${comment.content} , dateTime('now'), ${comment.articleId}, ${comment.userId});`);

    return result;
}

/*
async function retrieveRepliesForComment(commentId) {
    const db = await dbPromise;
    const replies = await db.all(SQL`
        SELECT c.*, u.username
        FROM comment AS c
        INNER JOIN user AS u ON c.userId = u.id
        WHERE c.parentCommentId = ${commentId};
    `);
    return replies;
}

async function retrieveCommentByArticleId(articleId) {
    const db = await dbPromise;
    const comments = await db.all(SQL`
        SELECT c.*, u.username
        FROM comment AS c
        INNER JOIN user AS u ON c.userId = u.id
        WHERE articleId = ${articleId} AND c.parentCommentId IS NULL;
    `);

    for (const comment of comments) {
        comment.replies = await retrieveRepliesForComment(comment.id);
    }

    return comments;
}
*/
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
    /*
    ,
    retrieveRepliesForComment
    */
};