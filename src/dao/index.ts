export interface IDao<T> {
  find(query: any): Promise<T[]>;
}
