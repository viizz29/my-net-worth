export type ShapeType<T> = { [key in keyof T]?: any };



export type CamelToSnakeCase<S extends string> =
    S extends `${infer First}${infer Rest}`
    ? Rest extends Uncapitalize<Rest>
    ? `${Lowercase<First>}${CamelToSnakeCase<Rest>}`
    : `${Lowercase<First>}_${CamelToSnakeCase<Uncapitalize<Rest>>}`
    : S;


export type SnakeCaseKeys<T> = {
    [K in keyof T as CamelToSnakeCase<string & K>]: T[K];
};


// Recursively converts all keys in nested objects and arrays from camelCase to snake_case, except for Date objects
export type SnakeCaseKeysRecursively<T> = T extends Date
    ? T // Do not recurse if T is a Date
    : T extends (infer U)[]
    ? SnakeCaseKeysRecursively<U>[] // Recursively apply to each element in an array
    : T extends object
    ? {
          [K in keyof T as K extends string ? CamelToSnakeCase<K> : K]: SnakeCaseKeysRecursively<T[K]>;
      }
    : T;
    

export type SnakeToCamelCase<S extends string> =
    S extends `${infer First}_${infer Rest}`
    ? `${First}${Capitalize<SnakeToCamelCase<Rest>>}`
    : S;

export type CamelCaseKeys<T> = {
    [K in keyof T as SnakeToCamelCase<string & K>]: T[K];
};


export type CamelCaseKeysRecursively<T> = T extends Date
    ? T // Do not recurse if T is a Date
    : T extends (infer U)[]
    ? CamelCaseKeysRecursively<U>[] // Recursively apply to each element in an array
    : T extends object
    ? {
          [K in keyof T as K extends string ? SnakeToCamelCase<K> : K]: CamelCaseKeysRecursively<T[K]>;
      }
    : T;