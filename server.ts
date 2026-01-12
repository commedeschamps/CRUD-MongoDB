import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/config/db";

async function main() {
  await connectDB();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
