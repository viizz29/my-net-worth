const path = require("path");
const dotenv = require("dotenv");

const nodeEnv = process.env.NODE_ENV || "development";
const projectRoot = path.resolve(__dirname, "../../..");
const envFilePath = path.join(projectRoot, `.env.${nodeEnv}`);

dotenv.config({ path: envFilePath });

const config = {
  username: process.env.DB_USERNAME || "postgres",
  password: decodeURIComponent(process.env.DB_PASSWORD || "password"),
  database: process.env.DB_DATABASE || "db72387238",
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: "postgres",
};

module.exports = {
  local: config,
  development: config,
  test: config,
  production: config,
};
