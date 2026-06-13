import { SingletonForm } from "@/app/modules/admin/components/singleton-form";
import type { Field } from "@/app/modules/admin/components/resource-manager";
const fields: Field[] = [
  { name: "fullName", label: "Full name", required: true }, { name: "professionalTitle", label: "Professional title", required: true },
  { name: "shortBio", label: "Short bio", type: "textarea", required: true }, { name: "aboutText", label: "Long about text", type: "textarea", required: true },
  { name: "profileImageUrl", label: "Profile image URL", type: "url" }, { name: "cvUrl", label: "CV download URL", type: "url" },
  { name: "email", label: "Email" }, { name: "phone", label: "Phone" }, { name: "location", label: "Location" },
  { name: "githubUrl", label: "GitHub URL", type: "url" }, { name: "linkedinUrl", label: "LinkedIn URL", type: "url" },
  { name: "facebookUrl", label: "Facebook URL", type: "url" }, { name: "instagramUrl", label: "Instagram URL", type: "url" },
  { name: "whatsappUrl", label: "WhatsApp URL", type: "url" },
];
export default function Page() { return <SingletonForm title="Profile" description="Edit the personal details shown throughout the public portfolio." endpoint="/api/profile" fields={fields} />; }
