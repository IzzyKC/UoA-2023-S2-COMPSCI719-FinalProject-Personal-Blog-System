

async function retrieveAllUserData(){
    const db=await dbPromise;
    const users=await db.all(SQL`select*from users`);
    return users;
}
//Export functions
module.exports= {
    retrieveAllUserData
   
    };
