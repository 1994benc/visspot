/** @jsx h */
import { h } from "preact";

import { tw } from "@twind";
import DashboardLayout from "../../../components/layouts/DashboardLayout.tsx";
import {
  HandlerContext,
  PageProps,
} from "https://deno.land/x/fresh@1.0.1/server.ts";
import Button, { ButtonType } from "../../../components/reusableUI/Button.tsx";

export function handler(req: Request, ctx: HandlerContext) {
  const userData = ctx.state;
  const resp = ctx.render({
    ...userData,
  });
  console.log(userData);
  return resp;
}

export default function ProfilePage(props: PageProps) {
  return (
    <DashboardLayout avatarUrl={props.data?.avatarUrl}>
      <div class={tw`content my-10 flex flex-col gap-4 items-start`}>
        <img src={props.data?.avatarUrl} class={tw`rounded-full w-20`} alt="" />
        <div>User name: {props.data.userName}</div>
        <div>User ID: {props.data.userId}</div>
        <div class={tw`bottomActions my-4`}>
          <a href="/api/auth/logout">
            <Button type={ButtonType.Outline}>Logout</Button>
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
