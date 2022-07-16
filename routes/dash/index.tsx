/** @jsx h */
import { h } from "preact";
import DashboardLayout from "../../components/layouts/DashboardLayout.tsx";

export default function index() {
  return <DashboardLayout>
    <div>
        <h1>This is your dashboard</h1>
    </div>
  </DashboardLayout>;
}
