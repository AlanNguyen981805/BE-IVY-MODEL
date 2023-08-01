export interface IResponse<T> {
  error: number;
  message: string;
  data: T | T[];
}

export enum GENDER {
  NAM = 1,
  NU = 2,
}
