import { Database } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
import { Project, ProjectSchema } from "../../models/Project.ts";

export async function insertProject(project: Project, db: Database) {
  try {
    const projectCollection = db.collection<ProjectSchema>("projects");
    const objectId = await projectCollection.insertOne(project);
    return objectId;
  } catch (e) {
    console.log(e);
    return null;
  }
}
