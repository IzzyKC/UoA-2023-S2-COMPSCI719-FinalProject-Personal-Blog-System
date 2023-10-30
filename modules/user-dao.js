const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

/**
 * Inserts the new user into the database. 
 * Then, return the ID which the database auto-assigned
 * 
 * @param newUser the new user details to insert
 */
async function addNewUser(newUser) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into newUser (id, username, password, realName, dateOfBirth, description) 
        values(${id},${username}, ${password}, ${realName},${dateOfBirth}, ${description} )`);

    // Get the auto-generated ID value, and return it back.
    return result.lastID;
}
//so the user can review the details in their account
async function retrieveNewUserDetails() {
    const db = await dbPromise;

    const userDetails = await db.all(SQL`select * from user where userId=${userId} `);

    return userDetails;
}
//so the user can update the details in their account
async function updateDetails (){
    const db = await dbPromise;

    const updateUserDetails = await db.all (SQL`update user 
    set username, password, realnName, dateOfBirth, description, video
    where userId  (${id}`)
}


// Export functions.
module.exports = {
    addNewUser,
    retrieveNewUserDetails,
    updateDetails
};
