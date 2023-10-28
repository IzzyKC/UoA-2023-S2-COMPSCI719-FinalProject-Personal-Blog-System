const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function retrieveAllThemeData() {
    const db = await dbPromise;

    const allThemeData = await db.all(SQL`select * from theme`);

    return allThemeData;
}

async function retrieveNameById(themeId) {
    const db = await dbPromise;

    const name = await db.get(SQL`select name from theme where id = ${themeId};`);

    return name;
}


// Export functions.
module.exports = {
    retrieveAllThemeData,
    retrieveNameById
};