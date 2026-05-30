/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./db/schema.js",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_TOKEN,
  },
  out: "./drizzle",
};
