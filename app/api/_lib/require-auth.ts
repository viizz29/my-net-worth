import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/app/backend-config";
import { ApiError } from "./api-error";

type AuthTokenPayload = {
  id?: string;
  name?: string;
  iat?: number;
  exp?: number;
};

export function requireAuth(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    throw new ApiError("Authorization header is required", 401);
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new ApiError("Invalid authorization header", 401);
  }

  if (!JWT_SECRET) {
    throw new ApiError("Server error, secret key not set", 500);
  }

  let payload: AuthTokenPayload;

  try {
    payload = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch {
    throw new ApiError("Invalid or expired token", 401);
  }

  if (!payload.id) {
    throw new ApiError("Token payload is missing user id", 401);
  }

  try {
    return {
      token,
      payload,
      userId: BigInt(payload.id),
    };
  } catch {
    throw new ApiError("Token payload has invalid user id", 401);
  }
}
