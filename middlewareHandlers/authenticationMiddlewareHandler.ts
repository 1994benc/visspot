import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.148.0/http/cookie.ts";
import { setCookie } from "https://deno.land/std@0.148.0/http/cookie.ts";
import { DatabaseProvider } from "../communication/DatabaseProvider.ts";
import { gitHubApi } from "../communication/GithubApi.ts";
import { User } from "../models/User.ts";
import { getUserByOauthId } from "../services/users/getUserByOauthUserId.ts";
import { insertUser } from "../services/users/insertUser.ts";

export async function authenticationMiddlewareHandler(
  req: Request,
  ctx: MiddlewareHandlerContext<User>
) {
  try {
    const dbProvider = new DatabaseProvider();
    await dbProvider.connect();
    const db = dbProvider.db;

    if (!db) {
      console.log("No DB connection");
      return redirectToSignInPage(req);
    }

    // Get cookie from request header and parse it
    const maybeAccessToken = getCookies(req.headers)["acctoken"];
    if (maybeAccessToken) {
      const userData = await gitHubApi.getUserData(maybeAccessToken);
      setUserDataInCtxState(ctx, userData);

      const userFromDb = await getUserByOauthId(userData.userId.toString(), db);

      if (userData.userId && userFromDb) {
        return ctx.next();
      }
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

    const userObjectId = await insertUser(userData, db);

    if (!userObjectId) {
      console.log("User not inserted");
      return redirectToSignInPage(req);
    }

    const response = await ctx.next();
    setCookie(response.headers, {
      name: "acctoken",
      value: accessToken,
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    dbProvider.disconnect();
    return response;
  } catch (e) {
    console.log(e);
    return redirectToSignInPage(req);
  }
}

function redirectToSignInPage(req: Request) {
  console.log("unauthorized");
  return Response.redirect(new URL(req.url).origin + "/sign-in");
}

function setUserDataInCtxState(
  ctx: MiddlewareHandlerContext<User>,
  userData: User
) {
  ctx.state.userId = userData.userId?.toString();
  ctx.state.userName = userData.userName;
  ctx.state.avatarUrl = userData.avatarUrl;
}
