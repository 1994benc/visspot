/** @jsx h */

import {
  HandlerContext,
  Handlers,
  PageProps,
} from "https://deno.land/x/fresh@1.0.1/server.ts";
import { h } from "preact";
import DashboardLayout from "../../components/layouts/DashboardLayout.tsx";
import { tw } from "@twind";
import Button from "../../components/reusableUI/Button.tsx";
import { insertProject } from "../../backendServices/projects/insertProject.ts";
import { Project, ProjectSchema } from "../../models/Project.ts";
import { DatabaseProvider } from "../../communication/DatabaseProvider.ts";
import { findProjectsByCreatorId } from "../../backendServices/projects/findProjectsByCreatorId.ts";
import CardButton from "../../components/reusableUI/CardButton.tsx";
import Heading from "../../components/reusableUI/Heading.tsx";

async function getHandler(req: Request, ctx: HandlerContext) {
  const middlewareState = ctx.state;

  const dbProvider = new DatabaseProvider();
  await dbProvider.connect();
  const db = dbProvider.db;
  if (!db) {
    return new Response("Could not connect to database", {
      status: 500,
    });
  }

  const projects = await findProjectsByCreatorId(
    middlewareState.userId + "",
    db
  );

  const resp = ctx.render({
    ...middlewareState,
    projects: projects || [],
  });

  dbProvider.disconnect();
  return resp;
}

async function postHandler(req: Request, ctx: HandlerContext) {
  const middlewareState = ctx.state;
  const dbProvider = new DatabaseProvider();
  await dbProvider.connect();
  const db = dbProvider.db;
  if (!db) {
    return new Response("Could not connect to database", {
      status: 500,
    });
  }

  const projectName = (await req.formData()).get("project_name")?.toString();
  console.log(projectName);

  if (projectName) {
    const project = new Project(projectName, "", middlewareState.userId + "");
    const objectId = await insertProject(project, db);
    console.log("Inserted project with id: " + objectId);
  }

  const projects = await findProjectsByCreatorId(
    middlewareState.userId + "",
    db
  );

  dbProvider.disconnect();

  const resp = ctx.render({
    ...middlewareState,
    projects: projects || [],
  });
  return resp;
}

export const handler: Handlers = {
  async GET(req, ctx) {
    return await getHandler(req, ctx);
  },
  async POST(req, ctx) {
    return await postHandler(req, ctx);
  },
};

export default function index(props: PageProps) {
  return (
    <DashboardLayout avatarUrl={props.data?.avatarUrl}>
      <div>
        <div class={tw`flex items-center gap-4 justify-between`}>
          <Heading><div>Your projects</div></Heading>
          <NewProjectForm />
        </div>

        <div>
          <ProjectList projects={props.data.projects} />
        </div>
      </div>
    </DashboardLayout>
  );
}

function ProjectList({ projects }: { projects: ProjectSchema[] }) {
  return (
    <div class={tw`flex gap-3 flex-wrap my-3`}>
      {projects?.map((project) => (
        <a
          key={project._id.toString()}
          href={`/dash/projects/${project._id.toString()}`}
        >
          <CardButton>
            <div>
              <div>{project.name}</div>
              <div>{project.description}</div>
            </div>
          </CardButton>
        </a>
      ))}
    </div>
  );
}

function NewProjectForm() {
  return (
    <form method="POST" class={tw`flex gap-2`}>
      <input
        class={tw`border border-black rounded-lg py-2 px-3`}
        placeholder="Project name"
        type="text"
        name="project_name"
        required
      />
      <Button isSubmitButton>New project</Button>
    </form>
  );
}
