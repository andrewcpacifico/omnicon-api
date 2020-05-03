import { Request, Response, NextFunction } from 'express';

import { IMiddleware } from '../';

export { BodyParserMiddleware } from './body-parser';

export interface IExpressMiddleware extends IMiddleware {
  handler(req: Request, res: Response, next: NextFunction): void;
}
