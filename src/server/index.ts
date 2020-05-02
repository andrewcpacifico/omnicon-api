export { ExpressServer } from './express';

export interface IServer {
  start(): Promise<void>;
}
