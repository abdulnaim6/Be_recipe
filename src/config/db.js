import pg from "pg";
import "dotenv/config";

const db = new pg.Pool({
  host: process.env.VERCEL_HOST,
  user: process.env.VERCEL_USER,
  password: process.env.VERCEL_PASSWORD,
  database: process.env.VERCEL_DB,
  port: process.env.VERCEL_PORT || 5432,
});

db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database:", err));

export default db;
