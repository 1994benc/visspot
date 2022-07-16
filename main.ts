/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { InnerRenderFunction, RenderContext, start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import { config, setup } from "@twind";
import { virtualSheet } from "twind/sheets";

const sheet = virtualSheet();
sheet.reset();
setup({
  ...config,
  sheet,
  theme: {
    extend: {
      fontFamily: {
        sans: "Poppins, sans-serif",
      },
    },
  },
  preflight: {
    // Import external stylesheet
    "@import": `url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,500;0,900;1,100;1,400;1,900&display=swap')`,
  },
});

function render(ctx: RenderContext, render: InnerRenderFunction) {
  const snapshot = ctx.state.get("twind") as unknown[] | null;
  sheet.reset(snapshot || undefined);
  render();
  ctx.styles.splice(0, ctx.styles.length, ...sheet.target);
  const newSnapshot = sheet.reset();
  ctx.state.set("twind", newSnapshot);
}

await start(manifest, { render });
