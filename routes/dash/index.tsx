/** @jsx h */

import { HandlerContext, PageProps } from "https://deno.land/x/fresh@1.0.1/server.ts";
import { h } from "preact";
import DashboardLayout from "../../components/layouts/DashboardLayout.tsx";

export  function handler(
  req: Request,
  ctx: HandlerContext
){
  const userData = ctx.state;
  const resp =  ctx.render({
    ...userData
  })
  console.log(userData)
  return resp
}

export default function index(props: PageProps) {
  return (
    <DashboardLayout avatarUrl={props.data?.avatarUrl}>
      <div>
        <h1>This is your dashboard</h1>
        {JSON.stringify(props.data)}
      </div>
    </DashboardLayout>
  );
}
