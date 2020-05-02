import express, { Express } from 'express';

import { IServer } from '.';
import { IConfigService, ILoggerService } from '../services';

type ExpressCreator = typeof express;

interface IExpressServerOptions {
  express: ExpressCreator;
  configService: IConfigService;
  loggerService: ILoggerService;
}

export class ExpressServer implements IServer {
  private configService: IConfigService;
  private expressCreator: ExpressCreator;
  private expressApp!: Express;
  private loggerService: ILoggerService;

  constructor({ express, configService, loggerService }: IExpressServerOptions) {
    this.expressCreator = express;
    this.configService = configService;
    this.loggerService = loggerService;
  }

  public start(): Promise<void> {
    this.expressApp = this.expressCreator();

    return new Promise((resolve, reject) => {
      const { port } = this.configService.get('server');
      this.expressApp.listen(port, (err: any) => {
        if (err) {
          reject(err);
        }

        this.loggerService.info(`Omnicon API listening on port ${port}`);
        resolve();
      });
    });
  }
}
