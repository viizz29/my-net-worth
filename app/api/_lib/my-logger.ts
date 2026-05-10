import { LOG_LEVEL } from "@/app/backend-config";
import { DateTime } from "luxon";

export const RED_COLOR = "\x1b[31m";

// Reset
export const RESET = "\x1b[0m";

// Text colors
export const BLACK = "\x1b[30m";
export const RED = "\x1b[31m";
export const GREEN = "\x1b[32m";
export const YELLOW = "\x1b[33m";
export const BLUE = "\x1b[34m";
export const MAGENTA = "\x1b[35m";
export const CYAN = "\x1b[36m";
export const WHITE = "\x1b[37m";

// Background colors
export const BG_BLACK = "\x1b[40m";
export const BG_RED = "\x1b[41m";
export const BG_GREEN = "\x1b[42m";
export const BG_YELLOW = "\x1b[43m";
export const BG_BLUE = "\x1b[44m";
export const BG_MAGENTA = "\x1b[45m";
export const BG_CYAN = "\x1b[46m";
export const BG_WHITE = "\x1b[47m";

// Extended colors (256-color mode)
export const EXT_COLOR = (colorCode: string) => `\x1b[38;5;${colorCode}m`;
export const EXT_BG_COLOR = (colorCode: string) => `\x1b[48;5;${colorCode}m`;

const getIST = () => {
  return DateTime.now().setZone("Asia/Kolkata").toFormat("yyyy-MM-dd HH:mm:ss");
};

enum LogLevels {
  OFF, // 0
  FATAL, // 1
  ERROR, // 2
  WARN, // 3
  INFO,
  DEBUG,
  TRACE,
  ALL,
}
export class CustomLogger {
  static async f(...params: any[]) {
    if (LOG_LEVEL >= LogLevels.FATAL) {
      console.log(MAGENTA, getIST(), ...params);
    }
  }

  static async e(...params: any[]) {
    if (LOG_LEVEL >= LogLevels.ERROR) {
      console.log(RED, getIST(), ...params);
    }
  }

  static async w(...params: any[]) {
    if (LOG_LEVEL >= LogLevels.WARN) {
      console.log(YELLOW, getIST(), ...params);
    }
  }

  static async i(...params: any[]) {
    if (LOG_LEVEL >= LogLevels.INFO) {
      console.log(GREEN, getIST(), ...params);
    }
  }

  static async d(...params: any[]) {
    if (LOG_LEVEL >= LogLevels.DEBUG) {
      console.log(RED, getIST(), ...params);
    }
  }

  static async t(...params: any[]) {
    if (LOG_LEVEL >= LogLevels.TRACE) {
      console.log(RED, getIST(), ...params);
    }
  }
}

export const showLogInRed = (text: string) => {
  CustomLogger.t(`${RED}${text}`);
};

export const showLogInGreen = (text: string) => {
  CustomLogger.t(`${GREEN}${text}`);
};

export const showLogInBlue = (text: string) => {
  CustomLogger.t(`${BLUE}${text}`);
};

export const showLog = (
  TAG: string,
  type: "info" | "success" | "warn" | "error",
  text: string,
) => {
  const textColor =
    type === "info"
      ? YELLOW
      : type === "success"
        ? GREEN
        : type === "warn"
          ? BLUE
          : RED;
  CustomLogger.t(`${MAGENTA}${TAG} ${textColor} ${text}`);
};

// nothing
