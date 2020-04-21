const path = require('path');
const nconf = require('nconf');

const configProvider = new nconf.Provider();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

configProvider.file('environment', {
  file: path.join(__dirname, `../config/${process.env.NODE_ENV}.json`),
}).file('default', {
  file: path.join(__dirname, '../config/default.json'),
});

module.exports = configProvider;
