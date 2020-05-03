import { Request, Response, NextFunction } from 'express';

import { IExpressMiddleware } from '.';
import { BodyParser } from '../../types-3rd';

interface BodyParserMiddlewareOptions {
  bodyParser: BodyParser;
}

export class BodyParserMiddleware implements IExpressMiddleware {
  private bodyParser: BodyParser;

  constructor({ bodyParser }: BodyParserMiddlewareOptions) {
    this.bodyParser = bodyParser;
  }

  handler(req: Request, res: Response, next: NextFunction): void {
    const jsonHandler = this.bodyParser.json();
    jsonHandler(req, res, next);
  }
}
