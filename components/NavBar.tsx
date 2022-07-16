/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Button, { ButtonType } from "./reusableUI/Button.tsx";

export default function NavBar() {
  return (
    <div class={tw`flex justify-between items-center static top-0 w-full`}>
      <div>
        <a href="/" class={tw`text-gray-800 font-bold flex flex-col items-center gap-1`}>
          <img src="/logo.svg" alt="logo" class={tw`h-16`} />
          <div class={tw`text-md font-thin`}>Visspot</div>
        </a>
      </div>
      <div class={tw`flex gap-3`}>
        {/* <Button type={ButtonType.Outline}>Flows</Button>
            <Button type={ButtonType.Outline}>Assets</Button>
            <Button type={ButtonType.Main}>Login</Button> */}
        
      </div>
    </div>
  );
}
