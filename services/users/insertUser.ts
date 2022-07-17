import { Database } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
import { User, UserSchema } from "../../models/User.ts";

export async function insertUser(user: User, db: Database) {
  try {
    const userCollection = db.collection<UserSchema>("users");
    const objectId = await userCollection.insertOne(user);
    return objectId;
  } catch (e) {
    console.log(e);
    return null;
  }
}
