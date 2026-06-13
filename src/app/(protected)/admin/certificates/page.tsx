import { ResourceManager, type Field } from "@/app/modules/admin/components/resource-manager";
const fields: Field[] = [
  { name: "title", label: "Certificate title", required: true }, { name: "issuer", label: "Issuer", required: true },
  { name: "issuedDate", label: "Issued date", type: "date", required: true }, { name: "credentialUrl", label: "Credential URL", type: "url" },
  { name: "imageUrl", label: "Image URL", type: "url" }, { name: "description", label: "Description", type: "textarea" },
  { name: "order", label: "Display order", type: "number" },
];
export default function Page() { return <ResourceManager title="Certificates" description="Publish credentials and continuous learning milestones." endpoint="/api/certificates" fields={fields} displayKey="title" />; }
