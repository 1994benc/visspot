/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export enum ButtonType {
  Main = "main",
  Outline = "outline",
}

const variantClasses = {
  [ButtonType.Main]: "bg-black text-white hover:bg-red-500",
  [ButtonType.Outline]:
    "bg-white border border-black text-black hover:border-red-500 hover:text-red-500",
};

export default function Button({
  children,
  type,
  isSubmitButton,
}: {
  children: h.JSX.Element | string;
  type?: ButtonType;
  isSubmitButton?: boolean;
}) {
  return (
    <button
      type={isSubmitButton ? "submit" : "button"}
      class={tw`${
        variantClasses[type || ButtonType.Main]
      }  transition-all duration-200  cursor-pointer px-6 py-2 rounded-lg flex justify-between gap-2`}
    >
      {children}
    </button>
  );
}
