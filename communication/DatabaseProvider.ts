import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import {
  Database,
  MongoClient,
} from "https://deno.land/x/mongo@v0.30.1/mod.ts";

export class DatabaseProvider {
  private _client: MongoClient | null = null;
  private _db: Database | null = null;

  /**
   * Connect to the database.
   */
   public async connect() {
    this._client = new MongoClient();
    await this._client.connect(config().DATABASE_URL);
    this._db = this._client.database("visspot_core");
  }

  public disconnect() {
    if (this._client) {
      this._client.close();
    }
  }

  /**
   * Get the database.
   */
  public get db() {
    return this._db;
  }
}
