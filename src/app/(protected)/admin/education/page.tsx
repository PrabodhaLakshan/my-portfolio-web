import { ResourceManager, type Field } from "@/app/modules/admin/components/resource-manager";
const fields: Field[] = [
  { name: "program", label: "Program", required: true }, { name: "institute", label: "Institute", required: true },
  { name: "startYear", label: "Start year", required: true }, { name: "endYear", label: "End year" },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "achievements", label: "Achievements", type: "list" }, { name: "order", label: "Display order", type: "number" },
];
export default function Page() { return <ResourceManager title="Education" description="Add academic programs, institutions, and achievements." endpoint="/api/education" fields={fields} displayKey="program" />; }
