// backup original env values
const originalEnv = { ...process.env };

export * from "./configs/base";
export * from "./configs/common";

delete (originalEnv as { NODE_ENV?: string }).NODE_ENV;
process.env = { ...originalEnv }; // restore the config
