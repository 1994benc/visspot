import { Database, ObjectId } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
import { ProjectSchema } from "../../models/Project.ts";

export async function deleteProjectByObjectId(id: string, db: Database) {
  try {
    const projectCollection = db.collection<ProjectSchema>("projects");
    const result = await projectCollection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}
