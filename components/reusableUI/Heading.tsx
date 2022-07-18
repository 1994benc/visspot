/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Heading({ children }: { children: h.JSX.Element }) {
  return <h1 class={tw`text-3xl font-bold`}>{children}</h1>;
}
