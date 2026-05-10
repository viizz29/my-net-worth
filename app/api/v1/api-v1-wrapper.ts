import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
  camelizeKeysAndEncryptIDs,
  kebabizeKeysAndDecryptIDs,
} from "@/app/api/_lib/camelize-and-kebabize";
import { JWT_SECRET } from "@/app/backend-config";

type ApiHandlerOptions = {
  successStatus?: number;
};

export interface ApiV1ResponseType {
  code: number;
  msg: string;
  data: unknown;
}

export class ApiV1User {
  private id: bigint;
  private name: string;
  constructor(decodedValue: any) {
    this.id = BigInt(decodedValue?.id);
    this.name = decodedValue?.name;
  }
  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }
}

export interface ApiV1Request {
  user: ApiV1User;
  originalBody: { [key: string]: any };
  body: { [key: string]: any };
}

export const ApiV1Wrapper = async (
  req: NextRequest,
  handler: (wealthTrackerRequest: ApiV1Request) => any,
  options: ApiHandlerOptions = {},
): Promise<NextResponse> => {
  return new Promise<NextResponse>(async (resolve) => {
    try {
      console.log("An API is hit !");

      // decode the user authentication information
      const token = req.headers.get("authorization")?.replace("Bearer ", "");
      if (!token) throw new Error("Invalid Authentication Token");
      if (!JWT_SECRET) throw new Error("Server error, secret key not set");
      const decoded: any = jwt.verify(token, JWT_SECRET as string);

      // Decode the body
      const originalBody = req.body ? await req.json() : {};
      console.log(originalBody, "originalBody");
      const processedBody = kebabizeKeysAndDecryptIDs(originalBody);
      console.log(processedBody, "processedBody");
      const apiv1Request = {
        user: new ApiV1User(decoded),
        originalBody,
        body: processedBody,
      };

      // call the actual handler
      const result = await handler(apiv1Request);

      // camelize the keys and hash the ids recursively
      const transformedResult = camelizeKeysAndEncryptIDs(result);

      // prepare the response object
      const response: ApiV1ResponseType = {
        code: options.successStatus ?? 200,
        msg: "OK",
        data: transformedResult,
      };

      // send the response

      resolve(
        NextResponse.json(response, {
          status: options.successStatus ?? 200,
        }),
      );

      console.log("Api finished !");
    } catch (error: any) {
      const response: ApiV1ResponseType = {
        code: 500,
        msg: "ERROR",
        data: error.toString(),
      };
      resolve(
        NextResponse.json(response, {
          status: 500,
        }),
      );
    }
  });
};
