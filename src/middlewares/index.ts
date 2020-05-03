export interface IMiddleware {
  handler(req: object, res: object, next: () => void): void;
}
