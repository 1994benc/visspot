import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { User } from "../models/User.ts";

export class GitHubApi {
  async getAccessToken(code: string) {
    const clientId = config().GITHUB_CLIENT_ID;
    const clientSecret = config().GITHUB_CLIENT_SECRET;
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data = await response.json();
    const accessToken = data["access_token"];
    if (typeof accessToken !== "string") {
      throw new Error("Access token was not a string.");
    }
    return accessToken;
  }

  async getUserData(accessToken: string) {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const userData = await response.json();
    const data = new User(
      (userData["id"] as number)?.toString(),
      userData["login"] as string,
      userData["avatar_url"] as string
    );

    return data;
  }
}

export const gitHubApi = new GitHubApi();
