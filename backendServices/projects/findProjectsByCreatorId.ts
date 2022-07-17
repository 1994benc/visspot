import { Database } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
import { ProjectSchema } from "../../models/Project.ts";

export async function findProjectsByCreatorId(creatorId: string, db: Database) {
  try {
    const projectCollection = db.collection<ProjectSchema>("projects");
    const projects = await projectCollection.find({ user: creatorId }).toArray();
    return projects;
  } catch (e) {
    console.log(e);
    return null;
  }
}
