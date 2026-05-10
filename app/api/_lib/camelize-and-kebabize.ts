import { camelCase, snakeCase } from "lodash";
import Hashids from "hashids";

import { HASHID_SALT } from "@/app/backend-config";

import { GenericObject } from "./general";
import { CustomLogger } from "./my-logger";
import {
  CamelCaseKeysRecursively,
  SnakeCaseKeysRecursively,
} from "./custom-typescript-utils";
import { NumberLike } from "hashids/util";
import { AppError } from "./my-error";

const MINIMUM_HASHID_SIZE_WITH_PADDING = 1;
const hashids = new Hashids("", MINIMUM_HASHID_SIZE_WITH_PADDING, HASHID_SALT);

function encodeLevel2(input: string): string {
  //toAsciiCodeString(input: string): string {
  return input
    .split("") // Split the string into individual characters
    .map((char) => char.charCodeAt(0)) // Convert each character to its ASCII code
    .join(""); // Join the ASCII codes with a space separator
}

const numericFieldNames: { [key: string]: boolean } = {
  limit: true,
  page_no: true,
};

const booleanFieldNames: { [key: string]: boolean } = {
  showTitle: true,
  showMrp: true,
  showSellingPrice: true,
  showDiscount: true,
  showSku: true,
  showDescription: true,
  showLogoWatermark: true,
};

const isNumericFieldName = (fieldName: string) => {
  return numericFieldNames[fieldName] ? true : false;
};

const isBooleanFieldName = (fieldName: string) => {
  return booleanFieldNames[fieldName] ? true : false;
};

function decodingLevel2(asciiString: string): string {
  //fromAsciiCodeStringNoSpaces(asciiString: string): string {
  const codes: number[] = [];
  let currentCode = "";

  for (const char of asciiString) {
    currentCode += char;

    // Check if currentCode is a valid ASCII value (32126 covers printable characters)
    const code = parseInt(currentCode, 10);
    if (code >= 32 && code <= 126) {
      codes.push(code);
      currentCode = ""; // Reset currentCode after a valid code is identified
    }
  }

  // Convert ASCII codes back to characters
  return codes.map((code) => String.fromCharCode(code)).join("");
}

export const encodeId = (id: bigint[]) => {
  try {
    return encodeLevel2(hashids.encode(id));
  } catch (err) {
    console.log(err);
    throw new AppError(400, "An invalid id has been provided");
  }
};

export const decodeId = (id: string) => {
  try {
    return hashids.decode(decodingLevel2(id));
  } catch (err) {
    console.log(err);
    throw new AppError(400, "An invalid id has been provided");
  }
};

export const camelizeKeysAndEncryptIDs = <T extends GenericObject>(
  obj: T,
): CamelCaseKeysRecursively<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) =>
      camelizeKeysAndEncryptIDs(v),
    ) as CamelCaseKeysRecursively<T>;
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      if (key == "id" || (key.length >= 4 && key.endsWith("_id")))
        return {
          ...result,
          [camelCase(key)]: encodeId(obj[key]),
        };
      else if (key == "ids" || (key.length >= 5 && key.endsWith("_ids"))) {
        if (obj[key]) {
          return {
            ...result,
            [camelCase(key)]: (obj[key] as []).map((item) => {
              return encodeId(item);
            }),
          };
        } else {
          return {
            ...result,
            [camelCase(key)]: null,
          };
        }
      } else
        return {
          ...result,
          [camelCase(key)]: camelizeKeysAndEncryptIDs(obj[key]),
        };
    }, {} as CamelCaseKeysRecursively<T>);
  }
  return obj as CamelCaseKeysRecursively<T>;
};

export const kebabizeKeysAndDecryptIDs = <T extends GenericObject>(
  obj: T,
): SnakeCaseKeysRecursively<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) =>
      kebabizeKeysAndDecryptIDs(v),
    ) as SnakeCaseKeysRecursively<T>;
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      if (key == "id" || (key.length >= 3 && key.endsWith("Id"))) {
        const decodedItem: NumberLike[] = decodeId(obj[key]);
        console.log({ key, decodedItem });
        return {
          ...result,
          [snakeCase(key)]:
            decodedItem.length == 0
              ? null
              : decodedItem.length == 1
                ? decodedItem[0]
                : decodedItem,
        };
      } else if (key == "ids" || (key.length >= 4 && key.endsWith("Ids")))
        return {
          ...result,
          [snakeCase(key)]: obj[key]
            ? (obj[key] as []).map((item) => {
                const decodedItem: NumberLike[] = decodeId(item);

                return decodedItem.length == 0
                  ? null
                  : decodedItem.length == 1
                    ? decodedItem[0]
                    : decodedItem;
              })
            : null,
        };
      else
        return {
          ...result,
          [snakeCase(key)]: kebabizeKeysAndDecryptIDs(obj[key]),
        };
    }, {} as SnakeCaseKeysRecursively<T>);
  }

  // trim strings
  if (typeof obj === "string" || obj instanceof String)
    return obj.trim() as any as SnakeCaseKeysRecursively<T>;

  return obj as SnakeCaseKeysRecursively<T>;
};

export const kebabizeKeysAndDecryptIDsOfQueryString = <T extends GenericObject>(
  obj: T,
): SnakeCaseKeysRecursively<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) =>
      kebabizeKeysAndDecryptIDs(v),
    ) as SnakeCaseKeysRecursively<T>;
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      if (key == "id" || (key.length >= 3 && key.endsWith("Id"))) {
        const decodedItem: NumberLike[] = decodeId(obj[key]);

        return {
          ...result,
          [snakeCase(key)]:
            decodedItem.length == 0
              ? null
              : decodedItem.length == 1
                ? decodedItem[0]
                : decodedItem,
        };
      } else if (key == "ids" || (key.length >= 4 && key.endsWith("Ids"))) {
        // expecint a comma separated list of items
        CustomLogger.t(obj[key]);
        let jkjk = obj as GenericObject;
        jkjk[key] = obj[key].split(",").map((item: string) => item.trim());
        return {
          ...result,
          [snakeCase(key)]: (obj[key] as []).map((item) => {
            const decodedItem: NumberLike[] = decodeId(item);

            return decodedItem.length == 0
              ? null
              : decodedItem.length == 1
                ? decodedItem[0]
                : decodedItem;
          }),
        };
      } else if (key.startsWith("show")) {
        return {
          ...result,
          [snakeCase(key)]: obj[key] === "true",
        };
      } else
        return {
          ...result,
          [snakeCase(key)]: kebabizeKeysAndDecryptIDs(obj[key]),
        };
    }, {} as SnakeCaseKeysRecursively<T>);
  }

  if (typeof obj === "string" || obj instanceof String)
    return obj.trim() as any as SnakeCaseKeysRecursively<T>;

  return obj as SnakeCaseKeysRecursively<T>;
};

export const camelizeKeys = <T extends GenericObject>(
  obj: T,
): CamelCaseKeysRecursively<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v)) as CamelCaseKeysRecursively<T>;
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {} as CamelCaseKeysRecursively<T>,
    );
  }
  return obj as CamelCaseKeysRecursively<T>;
};

export const kebabizeKeys = <T extends GenericObject>(
  obj: T,
): SnakeCaseKeysRecursively<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) => kebabizeKeys(v)) as SnakeCaseKeysRecursively<T>;
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: kebabizeKeys(obj[key]),
      }),
      {} as SnakeCaseKeysRecursively<T>,
    );
  }

  if (typeof obj === "string" || obj instanceof String)
    return obj.trim() as any as SnakeCaseKeysRecursively<T>;

  return obj as SnakeCaseKeysRecursively<T>;
};

export const processQueryString = <T extends GenericObject>(
  obj: T,
): SnakeCaseKeysRecursively<T> => {
  CustomLogger.i("Yo !", obj, Array.isArray(obj), obj.constructor, typeof obj);

  if (Array.isArray(obj)) {
    throw new Error("Arrays not allowed in query string");
  } else if (obj != null && typeof obj === "object") {
    // obj.constructor === Object) {

    CustomLogger.i({ obj });

    return Object.keys(obj).reduce((result, key) => {
      const keyy = snakeCase(key);

      CustomLogger.i({ key, keyy });

      if (key == "id" || (keyy.length >= 3 && keyy.endsWith("_id"))) {
        const decodedItem: NumberLike[] = decodeId(obj[key]);

        return {
          ...result,
          [keyy]:
            decodedItem.length == 0
              ? null
              : decodedItem.length == 1
                ? decodedItem[0]
                : decodedItem,
        };
      } else if (key == "ids" || (keyy.length >= 4 && keyy.endsWith("_ids"))) {
        // expecint a comma separated list of items
        CustomLogger.t(obj[key]);
        let jkjk = obj as GenericObject;
        jkjk[key] = obj[key].split(",").map((item: string) => item.trim());
        return {
          ...result,
          [keyy]: (obj[key] as []).map((item) => {
            const decodedItem: NumberLike[] = decodeId(item);

            return decodedItem.length == 0
              ? null
              : decodedItem.length == 1
                ? decodedItem[0]
                : decodedItem;
          }),
        };
      } else if (keyy.startsWith("is_") || keyy.startsWith("show_")) {
        return {
          ...result,
          [keyy]: obj[key] === "true",
        };
      } else if (keyy.startsWith("n_") || isNumericFieldName(keyy)) {
        return {
          ...result,
          [keyy]: Number(obj[key]),
        };
      } else
        return {
          ...result,
          [keyy]: kebabizeKeysAndDecryptIDs(obj[key]),
        };
    }, {} as SnakeCaseKeysRecursively<T>);
  }

  if (typeof obj === "string" || (obj as any) instanceof String)
    return (obj as string).trim() as any as SnakeCaseKeysRecursively<T>;

  return obj as SnakeCaseKeysRecursively<T>;
};
