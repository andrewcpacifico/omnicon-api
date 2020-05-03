import { Express } from 'express';

import { IServer } from '.';
import { IConfigService, ILoggerService } from '../services';
import { IMiddleware } from '../middlewares';
import { Express as ExpressCreator } from '../types-3rd';

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

  public init(): void {
    this.expressApp = this.expressCreator();
  }

  public start(): Promise<void> {
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

  public applyMiddleware(middleware: IMiddleware): void {
    this.expressApp.use(middleware.handler);
  }
}
