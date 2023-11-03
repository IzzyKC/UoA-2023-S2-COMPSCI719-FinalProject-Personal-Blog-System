const SQL = require("sql-template-strings");
const dbPromise = require("./database.js")

/*
 * Inserts the new user into the database. 
 * Then, return the ID which the database auto-assigned
 * 
 * @param user the new user details to insert
 */
async function addNewUser(user) {
    const db = await dbPromise;
    try{
        const result = await db.run(SQL`
            insert into user (username, password, name, birth, description, icon) 
                values
            (${user.username}, ${user.password}, ${user.name},${user.birth}, 
                ${user.description}, ${user.icon} );`);

        // Get the auto-generated ID value, and return it back.
        return result.lastID;
    }catch(error) {
        throw error;
    }
}


/**
 * Gets the user with the given id from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {number} id the id of the user to get.
 */
async function retrieveUserById(id) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from user
        where id = ${id}`);

    return user;
}

async function retrieveUserByUsername(username) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from user
        where username = ${username}`);

    return user;
}

/**
 * Gets the user with the given username and password from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} username the user's username
 * @param {string} password the user's password
 */
async function retrieveUserWithCredentials(username) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from user
        where username = ${username} ;`);

    return user;
}

/**
 * Gets the user with the given authToken from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} authToken the user's authentication token
 */
async function retrieveUserWithAuthToken(authToken) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from user
        where authToken = ${authToken}`);

    return user;
}

/**
 * Gets an array of all users from the database.
 */
async function retrieveAllUsers() {
    const db = await dbPromise;

    const users = await db.all(SQL`select * from user`);

    return users;
}

/**
 * Updates the given user in the database, not including auth token
 * 
 * @param user the user to update
 */
async function updateUserToken(user) {
    const db = await dbPromise;

    await db.run(SQL`
        update user
        set authToken = ${user.authToken}
        where id = ${user.id}`);
}

/**
 * Deletes the user with the given id from the database.
 * 
 * @param {number} id the user's id
 */
async function deleteUser(id) {
    const db = await dbPromise;

    await db.run(SQL`
        delete from user
        where id = ${id}`);
}

/**
 * Updates the given user in the database, not including auth token
 * 
 * @param user the user to update
 */
async function updateUserInfo(user) {
    const db = await dbPromise;

    await db.run(SQL`
        update user
        set username = ${user.username}, name = ${user.name}, 
            birth = ${user.birth}, 
            description = ${user.description},
            icon = ${user.icon}
        where id = ${user.id}`);
}

// Export functions.
module.exports = {
    retrieveUserById,
    retrieveUserByUsername,
    retrieveUserWithCredentials,
    retrieveUserWithAuthToken,
    retrieveAllUsers,
    updateUserToken,
    deleteUser,
    addNewUser,
    updateUserInfo
};
