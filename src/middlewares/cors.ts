import { IMiddleware } from '.';

export function corsMiddleware(): IMiddleware {
  return ({}, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  };
}
