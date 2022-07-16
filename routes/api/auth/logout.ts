import { deleteCookie } from "https://deno.land/std@0.148.0/http/cookie.ts";

export function handler(req: Request): Response {
  //   const headers = new Headers({
  //     location: new URL(req.url).origin,
  //   });

  const resp = new Response(null, {
    status: 302,
    headers: {
      location: new URL(req.url).origin,
    },
  });

  deleteCookie(resp.headers, "acctoken", {
    path: "/",
  });

  return resp;
}
