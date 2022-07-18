/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import DashboardLayout from "../../../components/layouts/DashboardLayout.tsx";
import Heading from "../../../components/reusableUI/Heading.tsx";

export default function AssetsPage() {
  return <DashboardLayout>
    <div>
        <Heading><div>Assets</div></Heading>
    </div>
  </DashboardLayout>;
}
