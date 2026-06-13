import { ResourceManager, type Field } from "@/app/modules/admin/components/resource-manager";
const fields: Field[] = [
  { name: "title", label: "Service title", required: true }, { name: "description", label: "Description", type: "textarea", required: true },
  { name: "icon", label: "Icon name" }, { name: "priceText", label: "Price text" },
  { name: "order", label: "Display order", type: "number" }, { name: "active", label: "Active", type: "checkbox" },
];
export default function Page() { return <ResourceManager title="Services" description="Manage the professional services shown on the homepage." endpoint="/api/services" fields={fields} displayKey="title" />; }
