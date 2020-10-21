import { Request, Response, NextFunction} from 'express';

export { bodyParserMiddleware } from './body-parser';
export { corsMiddleware } from './cors';

export type IMiddleware = (req: Request, res: Response, next: NextFunction) => void;
