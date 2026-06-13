import { ResourceManager, type Field } from "@/app/modules/admin/components/resource-manager";
const fields: Field[] = [
  { name: "name", label: "Skill name", required: true },
  { name: "category", label: "Category", type: "select", options: ["Frontend", "Backend", "Database", "Cyber Security", "Tools", "Soft Skills"] },
  { name: "level", label: "Level (0-100)", type: "number", required: true },
  { name: "icon", label: "Icon name" }, { name: "order", label: "Display order", type: "number" },
];
export default function Page() { return <ResourceManager title="Skills" description="Organize technical and professional skills by category." endpoint="/api/skills" fields={fields} displayKey="name" />; }
