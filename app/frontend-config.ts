export const APP_NAME = process.env.APP_NAME
  ? process.env.APP_NAME
  : "App Name";
export const MOCK_API_ON = process.env.MOCK_API_ON == "true";
export const BACKEND_SERVER = process.env.BACKEND_SERVER
  ? process.env.BACKEND_SERVER
  : "http://localhost:3000";
export const API_BASE_URL = process.env.API_BASE_URL
  ? process.env.API_BASE_URL
  : "/api";
export const SOCKETIO_ENABLED = process.env.SOCKETIO_ENABLED == "true";
export const SOCKETIO_ENDPOINT = process.env.SOCKETIO_ENDPOINT
  ? process.env.SOCKETIO_ENDPOINT
  : "/wssss";
