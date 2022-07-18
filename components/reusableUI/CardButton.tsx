/** @jsx h */
import { tw } from "@twind";
import { h } from "preact";

export default function CardButton({ children }: { children: h.JSX.Element }) {
  return (
    <div
      class={tw`
        rounded-lg
        border
        border-gray-300
        px-14 py-8
        hover:bg-gray-100 cursor-pointer
    `}
    >
      {children}
    </div>
  );
}
