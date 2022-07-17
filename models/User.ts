import { ObjectId } from "https://deno.land/x/mongo@v0.30.1/mod.ts";

export class User {
  constructor(
    public userId: string,
    public userName: string,
    public avatarUrl: string
  ) {}
}

export class UserSchema extends User {
  constructor(
    public _id: ObjectId,
    public userId: string,
    public userName: string,
    public avatarUrl: string
  ) {
    super(userId, userName, avatarUrl);
  }
}
