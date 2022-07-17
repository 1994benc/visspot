import { ObjectId } from "https://deno.land/x/mongo@v0.30.1/mod.ts";

export class Project {
  constructor(
    public name: string,
    public description: string,
    public user: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}

export class ProjectSchema extends Project {
  constructor(
    public _id: ObjectId,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    user: string
  ) {
    super(name, description,user, createdAt, updatedAt);
  }
}
