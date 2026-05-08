import { ApiError } from "@/app/api/_lib/api-error";

export class AuthServiceError extends ApiError {
  constructor(message: string, status = 400) {
    super(message, status);
    this.name = "AuthServiceError";
  }
}
