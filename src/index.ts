import { DependencyContainer, registerDependencies } from './dependency-container';

const dependencyContainer: DependencyContainer = registerDependencies();

async function initialize() {
  const {
    configService,
    databaseService,
    loggerService,
    server,
  } = dependencyContainer;

  configService.load();
  loggerService.init();
  await databaseService.connect();
  server.init();
}

function applyMiddlewares() {
  const { bodyParserMiddleware, server } = dependencyContainer;

  server.applyMiddleware(bodyParserMiddleware);
}

async function main() {
  const { server } = dependencyContainer;

  await initialize();
  applyMiddlewares();
  server.start();
}

main();
