/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import NavBar from "../components/NavBar.tsx";
import CheckIcon from "../components/reusableUI/CheckIcon.tsx";
import Button, { ButtonType } from "../components/reusableUI/Button.tsx";

export default function Home() {
  const listItemClass = tw`flex gap-3 items-center`;
  return (
    <div class={tw`p-6 mx-auto max-w-screen-md`}>
      <NavBar />
      <div class={tw`my-20`}>
        <h1 class={tw`md:text-7xl text-3xl`}>
          Behavioural science driven UX research platform
        </h1>
        <ul class={tw`my-10 font-thin text-xl`}>
          <li class={listItemClass}>
            <CheckIcon className="h-10 w-10 text-green-500" />{" "}
            <div>Make your static design images clickable and learn how users interact with them</div>
          </li>
          <li class={listItemClass}>
            <CheckIcon className="h-10 w-10 text-green-500" />{" "}
            <div>
              Run customisable
              <b class={tw`text-green-500 ml-2`}>Implicit Response Tests</b>
            </div>
          </li>
          <li class={listItemClass}>
            <CheckIcon className="h-10 w-10 text-green-500" /> Automatically
            generate insights
          </li>
          <li class={listItemClass}>
            <CheckIcon className="h-10 w-10 text-green-500" />{" "}
            <div>
              It's<b class={tw`text-green-500 ml-2`}>open-sourced</b>
            </div>
          </li>
        </ul>
        <div class={tw`flex gap-2 flex-col md:flex-row`}>
          <a href="https://form.jotform.com/221962077087058" target="blank">
            <Button>
              <div class={tw`flex items-center gap-2`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class={tw("h-6 w-6")}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                <div>Register interest</div>
              </div>
            </Button>
          </a>
          <a href="https://github.com/1994benc/visspot" target="blank">
            <Button type={ButtonType.Outline}>
              <div class={tw`flex items-center gap-2`}>
                <img src="/github.svg" class={tw`h-6 w-6`} alt="" />
                <div>Github</div>
              </div>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
