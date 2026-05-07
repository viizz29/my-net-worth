import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { camelCase, snakeCase } from 'lodash';
import dayjs from "dayjs";
import Hashids from 'hashids'



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const kebabize = (str: string) => {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '_' : ''}${letter.toLowerCase()}`
      : letter;
  }).join('');
}

export const variableNamesToColumnNames = (ob: any): any => {
  const res: { [key: string]: any } = {};
  const keys = Object.keys(ob);
  keys.forEach((key) => {
    res[kebabize(key)] = ob[key];
  });
  return res;
}



export const camelizeKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};



export const kebabizeKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => kebabizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: kebabizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};


const hashids = new Hashids('', 10, 'abcdefghijklmnopqrstuvwxyz') // all lowercase

export const camelizeKeysAndEncryptIDs = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeysAndEncryptIDs(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => {
        if (key == "id" || (key.length >= 4 && key.endsWith("_id")))
          return ({
            ...result,
            [camelCase(key)]: hashids.encode(obj[key]),
          })
        else return ({
          ...result,
          [camelCase(key)]: camelizeKeysAndEncryptIDs(obj[key]),
        })
      },
      {},
    );
  }
  return obj;
};


export const kebabizeKeysAndDecryptIDs = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => kebabizeKeysAndDecryptIDs(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => {
        if (key == "id" || (key.length >= 3 && key.endsWith("Id")))
          return ({
            ...result,
            [snakeCase(key)]: hashids.decode(obj[key])[0],
          })
        else return ({
          ...result,
          [snakeCase(key)]: kebabizeKeysAndDecryptIDs(obj[key]),
        })
      },
      {},
    );
  }
  return obj;
};

export const fd = (dateString: string): string => {
  return dayjs(dateString).format('MMM DD hh:mm a');
}
