/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Button, { ButtonType } from "./reusableUI/Button.tsx";

export default function DashboardNavBar() {
  return (
    <div class={tw`flex justify-between items-center static top-0 w-full`}>
      <div>
        <a
          href="/dash"
          class={tw`text-gray-800 font-bold flex flex-col items-center gap-1`}
        >
          <img src="/logo.svg" alt="logo" class={tw`h-4`} />
          <div class={tw`text-md font-thin`}>Visspot</div>
        </a>
      </div>
      <div class={tw`flex gap-3`}>
        {/* <Button type={ButtonType.Outline}>Flows</Button> */}
        <a href="/dash/assets"><Button type={ButtonType.Main}>Assets</Button></a>
        <a href="/api/auth/logout"><Button type={ButtonType.Outline}>Logout</Button></a>
      </div>
    </div>
  );
}
