require('dotenv/config');
const db = require('./db/index');
const {userTable} = require('./drizzle/schema');

async function getAllUsers() {
    const users = await db.select().from(userTable);
    console.log('Users in DB are ',users);
    return users;
}

async function createUser({id,name,email}) {
    const user = {id,name,email};
    await db.insert(userTable).values(user);
}


getAllUsers();
// createUser({id:1,name: 'Pramod', email:'exmaple@neo.com'});
// createUser({id:2,name: 'Raj', email:'raj@neo.com'});

// getAllUsers();