import { IMiddleware } from '../middlewares';

export { ExpressServer } from './express';

export interface IServer {
  init(): void;
  start(): Promise<void>;
  applyMiddleware(middleware: IMiddleware): void;
}
