class Config {
  constructor(container) {
    this.container = container;
  }

  load() {
    const { path, nconf, process } = this.container;

    this.configProvider = new nconf.Provider();

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    this.configProvider.file('environment', {
      file: path.join(__dirname, `../../config/${process.env.NODE_ENV}.json`),
    }).file('default', {
      file: path.join(__dirname, '../../config/default.json'),
    });
  }

  get(property) {
    return this.configProvider.get(property);
  }
}

module.exports = Config;
