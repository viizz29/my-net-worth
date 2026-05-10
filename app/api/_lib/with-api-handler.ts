import { NextResponse } from "next/server";
import { ValidationError } from "yup";
import { ApiError, type ErrorResponseDto } from "./api-error";
import { camelizeKeysAndEncryptIDs } from "./camelize-and-kebabize";
import { GenericObject } from "./general";

type ApiHandler<T> = (request: Request) => Promise<T>;

type ApiHandlerOptions = {
  successStatus?: number;
};

function toErrorResponse(error: unknown): {
  body: ErrorResponseDto;
  status: number;
} {
  if (error instanceof ValidationError) {
    return {
      body: {
        msg: "NOT OK",
        data: error.errors.length > 0 ? error.errors : error.message,
      },
      status: 400,
    };
  }

  if (error instanceof ApiError) {
    return {
      body: {
        msg: "NOT OK",
        data: error.data,
      },
      status: error.status,
    };
  }

  return {
    body: {
      msg: "NOT OK",
      data: "Internal server error",
    },
    status: 500,
  };
}

export function withApiHandler<T>(
  handler: ApiHandler<T>,
  options: ApiHandlerOptions = {},
) {
  return async function routeHandler(request: Request) {
    try {
      // const result = await handler(request);

      const result = camelizeKeysAndEncryptIDs(
        (await handler(request)) as GenericObject,
      );

      return NextResponse.json(result, {
        status: options.successStatus ?? 200,
      });
    } catch (error) {
      console.log(error);

      const { body, status } = toErrorResponse(error);
      return NextResponse.json(body, { status });
    }
  };
}
