const {drizzle} = require('drizzle-orm/node-postgres');


//postgres://<username>:<password>@<host>:<port>/<dbName>
const db = drizzle(process.env.DATABASE_URL);

module.exports = db;