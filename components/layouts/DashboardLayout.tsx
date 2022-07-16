/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import DashboardNavBar from "../DashboardNavBar.tsx";

export default function DashboardLayout({
  children,
}: {
  children: h.JSX.Element | string;
}) {
  return (
    <div class={tw`p-6 mx-auto max-w-screen-xl`}>
      <DashboardNavBar />
      <div class={tw`content my-8`}>{children}</div>
    </div>
  );
}
