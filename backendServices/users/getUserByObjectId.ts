import { Database } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
import { UserSchema } from "../../models/User.ts";

export async function getUserByObjectId(id: string, db: Database) {
  try {
    const userCollection = db.collection<UserSchema>("users");
    const user = await userCollection.findOne({ _id: { $oid: id } });
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}
