/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps } from "https://deno.land/x/fresh@1.0.1/server.ts";
import DashboardLayout from "../../../components/layouts/DashboardLayout.tsx";

export default function ProjectPage(props: PageProps) {
  const { projectId } = props.params;
  return (
    <DashboardLayout>
      <div>
        <h1>Project Page {projectId}</h1>
      </div>
    </DashboardLayout>
  );
}
