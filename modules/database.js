const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const dbPromise = sqlite.open({
    filename: "./project-database.db",
    driver: sqlite3.Database
}).then(async function (db) {
    await db.run("pragma foreign_keys=true");
    return db;
});
module.exports = dbPromise;