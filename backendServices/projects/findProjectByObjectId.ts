import { Database, ObjectId } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
import { ProjectSchema } from "../../models/Project.ts";

export async function findProjectByObjectId(id: string, db: Database) {
  try {
    const projectCollection = db.collection<ProjectSchema>("projects");
    const project = await projectCollection.findOne({ _id: new ObjectId(id) });
    return project;
  } catch (e) {
    console.log(e);
    return null;
  }
}
