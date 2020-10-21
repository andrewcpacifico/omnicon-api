export interface IFormatter<T> {
  format(data: T | T[]): any;
};
