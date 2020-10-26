import { dependencyContainer } from './dependency-container';

async function initialize() {
  const {
    configService,
    databaseService,
    loggerService,
  } = dependencyContainer;

  configService.load();
  loggerService.init();
  await databaseService.connect();
}

async function main() {
  const { server } = dependencyContainer;

  await initialize();
  return server.start();
}

export default main();
