import { Router } from 'express';

import { Express } from '../../types-3rd';

interface IOptions {
  express: Express;
}

export function v1MainRouter({ express }: IOptions): Router {
  const router = express.Router();

  router.get('/health', ({}, res) => {
    res.sendStatus(200);
  });

  return router;
}
