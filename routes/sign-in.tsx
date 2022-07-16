/** @jsx h */
import { h } from "preact";
import { config } from "config";
import { tw } from "@twind";
import Button from "../components/reusableUI/Button.tsx";
import NavBar from "../components/NavBar.tsx";

export default function SignInPage() {
  return (
    <div class={tw`p-6 mx-auto max-w-screen-md`}>
      <NavBar />
      <div class={tw`content my-10 `}>
        <h1 class={tw`text-4xl font-black mb-5`}>Choose a sign in option</h1>
        <div class={tw`flex gap-3 items-start`}>
          <a
            href={`/api/auth/github`}
          >
            <Button>Sign in with GitHub</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
