export interface IApiResponse<T> {
  statusCode: number;
  data?: T;
  message: string;
}
// apiErr
export interface IApiError {
  statusCode: number;
  message: string;
  data?: object | null;
  success: boolean;
  errors: Error[];
}

export type IStore<T, Q> = T & {
  loading: boolean;
  error: string | null;
  actions: Q;
};
