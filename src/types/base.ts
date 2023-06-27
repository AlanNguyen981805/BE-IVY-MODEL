export interface IResponse<T> {
  error: number;
  message: string;
  data: T | T[];
}
