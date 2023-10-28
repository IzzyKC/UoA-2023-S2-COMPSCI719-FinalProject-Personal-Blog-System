const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function addImage(image) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into image (path, articleId) values(${image.path}, ${image.articleId});`);
    return result;
}

async function retrieveAllImagesByArticleId(articleId) {
    const db = await dbPromise;

    const allimages = await db.all(SQL`select id,path from image where articleId = ${articleId}`);

    return allimages;
}

async function deleteImageById(id) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        delete from image where id = ${id};`);
    return result;
}


// Export functions.
module.exports = {
    addImage,
    retrieveAllImagesByArticleId,
    deleteImageById
};