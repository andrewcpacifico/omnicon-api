export { MongoService } from './mongo';

export interface IDatabaseService {
  connect(): Promise<void>;
  getClient(): any;
  disconnet(): Promise<void>;
};
