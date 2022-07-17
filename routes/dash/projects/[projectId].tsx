/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.0.1/server.ts";
import DashboardLayout from "../../../components/layouts/DashboardLayout.tsx";
import Button, { ButtonType } from "../../../components/reusableUI/Button.tsx";
import { DatabaseProvider } from "../../../communication/DatabaseProvider.ts";
import { deleteProjectByObjectId } from "../../../backendServices/projects/deleteProjectByObjectId.ts";
import { findProjectByObjectId } from "../../../backendServices/projects/findProjectByObjectId.ts";
import { ProjectSchema } from "../../../models/Project.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const projectId = ctx.params.projectId;

    const middlewareState = ctx.state;
    const dbProvider = new DatabaseProvider();
    await dbProvider.connect();
    const db = dbProvider.db;
    if (!db) {
      return new Response("Could not connect to database", {
        status: 500,
      });
    }

    const project = await findProjectByObjectId(projectId, db);

    const resp = ctx.render({
      ...middlewareState,
      project,
    });
    return resp;
  },
  async POST(req, ctx) {
    const formData = await req.formData();
    const deleteProjectId = formData.get("delete_project");

    if (deleteProjectId) {
      const dbProvider = new DatabaseProvider();
      await dbProvider.connect();
      const db = dbProvider.db;
      if (!db) {
        return new Response("Could not connect to database", {
          status: 500,
        });
      }
      const projectId = deleteProjectId.toString();
      const deleteNum = await deleteProjectByObjectId(projectId, db);

      console.log({ projectId, deleteNum });

      const url = new URL(req.url).origin + "/dash";
      dbProvider.disconnect()
      return Response.redirect(url);
    }

    

    const resp = ctx.render();
    return resp;
  },
};

export default function ProjectPage(props: PageProps) {
  const { projectId } = props.params;
  const project = props.data.project as ProjectSchema;
  return (
    <DashboardLayout avatarUrl={props.data.avatarUrl}>
      <div>
        <div class={`flex items-center justify-between`}>
          <h1>{project.name}</h1>
          <form method="post">
            <input type="text" name="delete_project" value={projectId} hidden />
            <Button isSubmitButton type={ButtonType.Outline}>
              Delete
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
