import { SingletonForm } from "@/app/modules/admin/components/singleton-form";
import type { Field } from "@/app/modules/admin/components/resource-manager";
const fields: Field[] = [
  { name: "siteTitle", label: "Site title", required: true }, { name: "metaDescription", label: "Meta description", type: "textarea", required: true },
  { name: "heroBadgeText", label: "Hero badge text" }, { name: "primaryColor", label: "Primary color" }, { name: "accentColor", label: "Accent color" },
  { name: "showServicesSection", label: "Show services section", type: "checkbox" },
  { name: "showCertificatesSection", label: "Show certificates section", type: "checkbox" },
  { name: "showExperienceSection", label: "Show experience section", type: "checkbox" },
  { name: "maintenanceMode", label: "Maintenance mode", type: "checkbox" },
];
export default function Page() { return <SingletonForm title="Site Settings" description="Control metadata, visual preferences, and homepage section visibility." endpoint="/api/settings" fields={fields} />; }
