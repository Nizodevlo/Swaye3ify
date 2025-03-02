class ApiError extends Error {
  statusCode: number;
  data?: object | null;
  success: boolean;
  errors: Error[];

  constructor(
    statusCode: number,
    message: string = 'Something went wrong',
    errors: Error[] = [],
    stack?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
