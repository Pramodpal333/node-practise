const {pgTable,integer,varchar,uuid} = require("drizzle-orm/pg-core");

const authorsTable = pgTable('authors',{
    id:uuid().primaryKey().defaultRandom(),
    firstName: varchar({length:55}).notNull(),
    lastName: varchar({length:55}),
    email:varchar({length:100}).unique().notNull(),
});

module.exports = authorsTable;
