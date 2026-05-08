export type ErrorResponseDto = {
  msg: "NOT OK";
  data: unknown;
};

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status = 400, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data ?? message;
  }
}
