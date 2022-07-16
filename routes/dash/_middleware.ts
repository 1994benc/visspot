// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { authenticationMiddlewareHandler, User } from "../../middlewareHandlers/authenticationMiddlewareHandler.ts";


export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<User>
) {
    return await authenticationMiddlewareHandler(req, ctx);
}
