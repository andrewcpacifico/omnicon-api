class Server {
  constructor(container) {
    this.container = container;
  }

  loadEnv() {
    const { dotenv } = this.container;
    dotenv.config();
  }

  async start() {
    this.loadEnv();
  }
}

module.exports = Server;
