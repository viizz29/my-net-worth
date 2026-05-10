import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
  camelizeKeysAndEncryptIDs,
  decodeId,
  kebabizeKeysAndDecryptIDs,
} from "@/app/api/_lib/camelize-and-kebabize";
import { JWT_SECRET } from "@/app/backend-config";
import { ValidationError } from "yup";
import { ApiError } from "../_lib/api-error";
import { GenericObject } from "../_lib/general";
import { CustomLogger } from "../_lib/my-logger";
import { AppError } from "../_lib/my-error";

type ApiHandlerOptions = {
  successStatus?: number;
  publicAPI?: boolean;
  doNotWrap?: boolean;
};

export interface ApiV1ResponseType {
  code: number;
  msg: string;
  data: unknown;
}

export interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
}

export class ApiV1User {
  private id: bigint;
  constructor(decodedValue: DecodedToken) {
    this.id = BigInt(decodeId(decodedValue.sub)[0]);
  }
  public getId() {
    return this.id;
  }
}

export class ApiV1Request {
  private user: ApiV1User | null;
  private originalBody: { [key: string]: unknown };
  private body: { [key: string]: unknown };
  constructor({
    user,
    originalBody,
    body,
  }: {
    user: ApiV1User | null;
    originalBody: { [key: string]: unknown };
    body: { [key: string]: unknown };
  }) {
    this.user = user;
    this.originalBody = originalBody;
    this.body = body;
  }

  getUser() {
    if (!this.user) {
      throw new Error("Unable to verify user identity.");
    }
    return this.user;
  }

  getOriginalBody() {
    return this.originalBody;
  }

  getBody() {
    return this.body;
  }
}

export const ApiV1Wrapper = async (
  req: NextRequest,
  handler: (req: ApiV1Request) => unknown,
  options: ApiHandlerOptions = {},
) => {
  try {
    CustomLogger.i("An API is hit !", req.url);

    let decodedAuthToken: DecodedToken | null = null;

    if (!options.publicAPI) {
      // decode the user authentication information
      const token = req.headers.get("authorization")?.replace("Bearer ", "");

      if (!token) throw new AppError(401, "Authentication required.");
      if (!JWT_SECRET)
        throw new AppError(401, "Server error, secret key not set");

      decodedAuthToken = jwt.verify(
        token,
        JWT_SECRET as string,
      ) as DecodedToken;
      CustomLogger.t("Decoded auth token:", decodedAuthToken);
    }

    // Decode the body if any

    let originalBody = {};
    let processedBody = {};

    try {
      originalBody = req.body ? await req.json() : {};
      CustomLogger.t(originalBody, "originalBody");
      processedBody = kebabizeKeysAndDecryptIDs(originalBody);
      CustomLogger.t(processedBody, "processedBody");
    } catch (err) {
      CustomLogger.f("Error while processing request body", err);
    }

    const apiV1Request = new ApiV1Request({
      user: decodedAuthToken ? new ApiV1User(decodedAuthToken) : null,
      originalBody,
      body: processedBody,
    });

    // call the actual handler, camelize the keys and hash the ids recursively (of the response)
    const result = camelizeKeysAndEncryptIDs(
      (await handler(apiV1Request)) as GenericObject,
    );

    // send the response
    CustomLogger.i("Api finished !");

    return NextResponse.json(
      options.doNotWrap
        ? result
        : {
            code: options.successStatus ?? 200,
            msg: "OK",
            data: result,
          },
      {
        status: options.successStatus ?? 200,
      },
    );
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          code: 400,
          msg: "NOT OK",
          data: error.errors.length > 0 ? error.errors : error.message,
        },
        {
          status: 400,
        },
      );
    }

    if (error instanceof AppError) {
      return NextResponse.json(
        {
          code: error.getCode(),
          msg: error.getMessage(),
        },
        {
          status: error.getCode(),
        },
      );
    }

    CustomLogger.e(error);

    return NextResponse.json(
      {
        code: 500,
        msg: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
};
