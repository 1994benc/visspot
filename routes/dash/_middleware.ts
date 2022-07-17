// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { authenticationMiddlewareHandler } from "../../middlewareHandlers/authenticationMiddlewareHandler.ts";
import { User } from "../../models/User.ts";


export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<User>
) {
    return await authenticationMiddlewareHandler(req, ctx);
}
