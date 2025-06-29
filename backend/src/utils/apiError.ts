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
  toJSON() {
    return {
      statusCode: this.statusCode,
      success: this.success,
      message: this.message, // now explicitly included
      data: this.data,
      errors: this.errors,
      name: this.name,
      stack: this.stack,
    };
  }
}

export default ApiError;
