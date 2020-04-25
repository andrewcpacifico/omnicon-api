const awilix = require('awilix');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const pino = require('pino');

const Server = require('./server');

const { asClass, asValue, createContainer } = awilix;

const container = createContainer();

// external dependencies
container.register({
  dotenv: asValue(dotenv),
  express: asValue(express),
  mongoose: asValue(mongoose),
  pino: asValue(pino),
});

container.register({
  server: asClass(Server).singleton(),
});

container.loadModules(['services/*.js'], {
  formatName: (name, descriptor) => {
    const splat = descriptor.path.split('/');
    const namespace = splat[splat.length - 2];
    const upperNamespace = namespace.charAt(0).toUpperCase() + namespace.substring(1);
    return name + upperNamespace;
  },
});

container.cradle.server.start();
