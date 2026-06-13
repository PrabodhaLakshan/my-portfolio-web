import { ResourceManager, type Field } from "@/app/modules/admin/components/resource-manager";
const fields: Field[] = [
  { name: "role", label: "Role", required: true }, { name: "organization", label: "Organization", required: true },
  { name: "type", label: "Type", type: "select", options: ["Internship", "Academic Project", "Volunteer", "Freelance", "Club Activity", "Other"] },
  { name: "startDate", label: "Start date", type: "date", required: true }, { name: "endDate", label: "End date", type: "date" },
  { name: "currentlyWorking", label: "Currently working", type: "checkbox" },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "technologies", label: "Technologies", type: "list" }, { name: "order", label: "Display order", type: "number" },
];
export default function Page() { return <ResourceManager title="Experience" description="Track internships, project work, volunteering, and activities." endpoint="/api/experience" fields={fields} displayKey="role" />; }
