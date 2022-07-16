import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.148.0/http/cookie.ts";
import { setCookie } from "https://deno.land/std@0.148.0/http/cookie.ts";
import { gitHubApi } from "../communication/GithubApi.ts";

export interface User {
  userId: number;
  userName: string;
  avatarUrl: string;
}

export async function authenticationMiddlewareHandler(
  req: Request,
  ctx: MiddlewareHandlerContext<User>
) {
  try {
    // Get cookie from request header and parse it
    const maybeAccessToken = getCookies(req.headers)["acctoken"];
    //   const database = await databaseLoader.getInstance();
    if (maybeAccessToken) {
      const userData = await gitHubApi.getUserData(maybeAccessToken);
      setUserDataInCtxState(ctx, userData);

      // const user = await database.getUserByAccessToken(maybeAccessToken);
      // if (user) {
      if (userData.userId) {
        return ctx.next();
      }
      // }
    }

    // This is an oauth callback request.
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    if (!code) {
      // unauthorized
      return redirectToSignInPage(req);
    }

    const accessToken = await gitHubApi.getAccessToken(code);
    const userData = await gitHubApi.getUserData(accessToken);
    setUserDataInCtxState(ctx, userData);

    //   await database.insertUser({
    //     userId: userData.userId,
    //     userName: userData.userName,
    //     accessToken,
    //     avatarUrl: userData.avatarUrl,
    //   });
    const response = await ctx.next();
    setCookie(response.headers, {
      name: "acctoken",
      value: accessToken,
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return response;
  } catch (e) {
    console.log(e)
    return redirectToSignInPage(req);
  }
}

function redirectToSignInPage(req: Request) {
  console.log("unauthorized");
  return Response.redirect(new URL(req.url).origin + "/sign-in");
}

function setUserDataInCtxState(
  ctx: MiddlewareHandlerContext<User>,
  userData: { userId: number; userName: string; avatarUrl: string }
) {
  ctx.state.userId = userData.userId;
  ctx.state.userName = userData.userName;
  ctx.state.avatarUrl = userData.avatarUrl;
}
