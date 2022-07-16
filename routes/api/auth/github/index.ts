import { HandlerContext } from "$fresh/server.ts";
import { config } from "config";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  return Response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${
      config().GITHUB_CLIENT_ID
    }&scope=user:email`
  );
};
