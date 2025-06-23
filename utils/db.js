import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.db = null;

    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
      });
  }

  isAlive() {
    return !!this.db;
  }

  async waitForConnection() {
    while (!this.isAlive()) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async nbUsers() {
    await this.waitForConnection();
    const users = this.db.collection('users');
    return users.countDocuments();
  }

  async nbFiles() {
    await this.waitForConnection();
    const files = this.db.collection('files');
    return files.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
