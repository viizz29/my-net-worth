import { PROJECT_LOCATION } from "./base";

export function isValidNumber(value: any) {
  if (typeof value == "undefined") return false;
  if (typeof value == "number") return true;
  const v = Number(value);
  return typeof v === "number" && !isNaN(v) && isFinite(v);
}

export const RESOURCES_LOCATION = `${PROJECT_LOCATION}/res`;

export const APP_VERSION = process.env.APP_VERSION
  ? process.env.APP_VERSION
  : "10";
export const APP_DOMAIN = process.env.APP_DOMAIN
  ? process.env.APP_DOMAIN
  : "http://localhost";
export const PORT = process.env.PORT ? process.env.PORT : "3000";
// export const DOMAIN_WITH_PORT = `${APP_DOMAIN}:${PORT}`;
export const API_BASE_URL = process.env.API_BASE_URL
  ? process.env.API_BASE_URL
  : "";

export const SOCKETIO_ENDPOINT = process.env.SOCKETIO_ENDPOINT
  ? process.env.SOCKETIO_ENDPOINT
  : "";

export const PUBLIC_HOST_WITH_PORT = process.env.PUBLIC_HOST_WITH_PORT
  ? process.env.PUBLIC_HOST_WITH_PORT
  : `http://localhost:${PORT}`;

export const DB_DATABASE = process.env.DB_DATABASE
  ? process.env.DB_DATABASE
  : "db72387238";
export const DB_USERNAME = process.env.DB_USERNAME
  ? process.env.DB_USERNAME
  : "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD
  ? process.env.DB_PASSWORD
  : "password";
export const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : "127.0.0.1";
export const DATABASE_URL = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_DATABASE}?schema=public&connection_limit=2`;

export const JWT_SECRET = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : "fsdfdfdsffdsfsdfdsfsdfds";

export const LOCAL_STORAGE_LOCATION = process.env.LOCAL_STORAGE_LOCATION
  ? process.env.LOCAL_STORAGE_LOCATION
  : `${PROJECT_LOCATION}/storage`;
export const TEMP_LOCATION = process.env.TEMP_LOCATION
  ? process.env.TEMP_LOCATION
  : `${LOCAL_STORAGE_LOCATION}/temp`;

export const DOCS_URL = process.env.DOCS_URL ? process.env.DOCS_URL : `/docs`;
export const HASHID_SALT = process.env.HASHID_SALT
  ? process.env.HASHID_SALT
  : `your-salt`;

export const LOG_LEVEL = isValidNumber(process.env.LOG_LEVEL)
  ? Number(process.env.LOG_LEVEL)
  : 7;
