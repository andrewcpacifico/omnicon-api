import { Mongoose } from 'mongoose';

import { IConfigService, IDatabaseService, ILoggerService } from '..';

interface IMongoServiceOptions {
  configService: IConfigService;
  loggerService: ILoggerService;
  mongoose: Mongoose;
}

export class MongoService implements IDatabaseService {
  private configService: IConfigService;
  private loggerService: ILoggerService;
  private mongoose: Mongoose;

  constructor({ mongoose, configService, loggerService }: IMongoServiceOptions) {
    this.configService = configService;
    this.loggerService = loggerService;
    this.mongoose = mongoose;
  }

  async connect() {
    const { host, database } = this.configService.get('mongo');

    const url = `mongodb://${host}/${database}`;

    this.loggerService.info('Connecting do mongo database');
    try {
      await this.mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.loggerService.info('Mongo connection stablished');
    } catch (err) {
      this.loggerService.error('Error connecting to mongo.');
      throw err;
    }
  }
}
