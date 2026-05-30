## Using and Integrating Drizzle

1. Installig Drizzle ORM for sqlite, postgres etc. --ref-docs @ https://orm.drizzle.team/docs/get-started-sqlite#better-sqlite3

2. Setting up a schema in folder db / schema.js and an index.js

3. Setting up a config file with the name drizzle.config.js/ts

4. Adding a script named "migration:generate" with values ---> "drizzle-kit generate:sqlite --schema=./db/schema.js"

5. Running npm run migration:generate ----

6. Push DB to hosted DB with npx drizzle-kit generate:sqlite push or npx drizzle-kit push:sqlite just to push
