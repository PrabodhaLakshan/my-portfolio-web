# PORTFOLIO UPDATE INSTRUCTIONS FOR CODEX
## Vercel Blob JSON Storage + YouTube/Vercel Project Videos

Update the existing portfolio project for **W.M. Prabodha Lakshan**.

The previous project was created using the earlier Codex portfolio instructions. Now update it with these changes.

---

## 1. New Goal

Convert the portfolio from database-based storage to a simple personal portfolio storage system:

- No PostgreSQL
- No Prisma
- No database connection
- No `DATABASE_URL`
- Use **Vercel Blob** to store `portfolio-data.json`
- Use **Vercel Blob** for small uploaded files: images, CV, certificate images, small videos
- Use **YouTube** for large project demo videos
- Admin panel is only for one admin: W.M. Prabodha Lakshan

---

## 2. Required Video Feature

In the admin project add/edit form, add a select field:

```txt
Video Source:
1. None
2. Vercel Upload
3. YouTube Link
```

### If `None`
- Hide upload input
- Hide YouTube URL input
- Save `video.source = "none"`

### If `Vercel Upload`
- Show file upload input
- Upload the selected video file to Vercel Blob using client upload
- Save the returned Blob URL in the project data
- Public website must play it using HTML `<video>`
- It must autoplay muted

### If `YouTube Link`
- Show YouTube URL input
- Admin pastes YouTube URL
- Extract YouTube video ID
- Save YouTube URL and video ID
- Public website must show YouTube embed
- It must autoplay muted

Important: autoplay with sound is blocked by browsers, so force muted autoplay.

---

## 3. Environment Variables

Update `.env.example`:

```env
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

ADMIN_EMAIL=admin@portfolio.dev
ADMIN_PASSWORD=Admin@12345

BLOB_READ_WRITE_TOKEN=
PORTFOLIO_DATA_BLOB_PATH=portfolio-data.json
```

Remove:

```env
DATABASE_URL=
```

---

## 4. Install / Remove Packages

Install:

```bash
npm install @vercel/blob
```

If Prisma is not used anymore:

```bash
npm uninstall prisma @prisma/client
```

---

## 5. Remove Prisma Usage

Search the project for:

```txt
prisma
@prisma/client
DATABASE_URL
```

Remove or replace all database logic.

Do not use:

```ts
import { prisma } from "@/lib/prisma";
```

Use Vercel Blob JSON helpers instead.

---

## 6. Portfolio Data Type

Create:

```txt
src/app/modules/shared/types/portfolio-data.ts
```

Add:

```ts
export type ProjectVideoSource = "none" | "vercel" | "youtube";

export type ProjectVideo = {
  source: ProjectVideoSource;
  url?: string;
  youtubeUrl?: string;
  youtubeVideoId?: string;
  blobUrl?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
};

export type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  category: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  video?: ProjectVideo;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioData = {
  profile: {
    fullName: string;
    professionalTitle: string;
    shortBio: string;
    aboutText: string;
    profileImageUrl?: string;
    cvUrl?: string;
    email?: string;
    phone?: string;
    location?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    whatsappUrl?: string;
  };

  projects: PortfolioProject[];

  skills: {
    id: string;
    name: string;
    category: string;
    level: number;
    icon?: string;
    order: number;
  }[];

  education: {
    id: string;
    program: string;
    institute: string;
    startYear: string;
    endYear?: string;
    description: string;
    achievements: string[];
    order: number;
  }[];

  experience: {
    id: string;
    role: string;
    organization: string;
    type: string;
    startDate: string;
    endDate?: string;
    currentlyWorking: boolean;
    description: string;
    technologies: string[];
    order: number;
  }[];

  certificates: {
    id: string;
    title: string;
    issuer: string;
    issuedDate: string;
    credentialUrl?: string;
    imageUrl?: string;
    description?: string;
    order: number;
  }[];

  services: {
    id: string;
    title: string;
    description: string;
    icon?: string;
    priceText?: string;
    order: number;
    active: boolean;
  }[];

  messages: {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: "read" | "unread";
    createdAt: string;
    updatedAt: string;
  }[];

  settings: {
    siteTitle: string;
    metaDescription: string;
    heroBadgeText?: string;
    primaryColor?: string;
    accentColor?: string;
    showServicesSection: boolean;
    showCertificatesSection: boolean;
    showExperienceSection: boolean;
    maintenanceMode: boolean;
  };
};
```

---

## 7. Default Data

Create:

```txt
src/app/modules/shared/default-portfolio-data.ts
```

Use default content for W.M. Prabodha Lakshan.

Default project video object:

```ts
video: {
  source: "none",
  autoplay: true,
  muted: true,
  loop: true,
  controls: true
}
```

---

## 8. Vercel Blob JSON Store Helper

Create:

```txt
src/lib/portfolio-store.ts
```

Add helper functions:

```ts
import { list, put } from "@vercel/blob";
import { defaultPortfolioData } from "@/app/modules/shared/default-portfolio-data";
import type { PortfolioData } from "@/app/modules/shared/types/portfolio-data";

const PORTFOLIO_DATA_BLOB_PATH =
  process.env.PORTFOLIO_DATA_BLOB_PATH || "portfolio-data.json";

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const result = await list({ prefix: PORTFOLIO_DATA_BLOB_PATH });
    const blob = result.blobs.find(
      (item) => item.pathname === PORTFOLIO_DATA_BLOB_PATH
    );

    if (!blob?.url) return defaultPortfolioData;

    const response = await fetch(blob.url, { cache: "no-store" });

    if (!response.ok) return defaultPortfolioData;

    return (await response.json()) as PortfolioData;
  } catch {
    return defaultPortfolioData;
  }
}

export async function savePortfolioData(
  data: PortfolioData
): Promise<PortfolioData> {
  await put(PORTFOLIO_DATA_BLOB_PATH, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });

  return data;
}

export async function updatePortfolioData(
  updater: (data: PortfolioData) => PortfolioData | Promise<PortfolioData>
): Promise<PortfolioData> {
  const currentData = await getPortfolioData();
  const updatedData = await updater(currentData);
  await savePortfolioData(updatedData);
  return updatedData;
}
```

If the current `@vercel/blob` version gives an overwrite option error, use the latest overwrite method supported by the SDK.

---

## 9. Admin Auth Without Database

Update login logic:

- Use `ADMIN_EMAIL`
- Use `ADMIN_PASSWORD`
- No database query
- Protect `/admin` and `/admin/*`

Credentials check example:

```ts
if (
  credentials?.email === process.env.ADMIN_EMAIL &&
  credentials?.password === process.env.ADMIN_PASSWORD
) {
  return {
    id: "admin",
    email: process.env.ADMIN_EMAIL,
    name: "W.M. Prabodha Lakshan",
  };
}

return null;
```

Do not expose env password to client components.

---

## 10. Vercel Blob Upload Route

Create:

```txt
src/app/api/blob/upload/route.ts
```

Use Vercel Blob client upload.

Rules:

- Only authenticated admin can upload
- No anonymous upload
- Allow only selected file types

Allowed file types:

```txt
image/jpeg
image/png
image/webp
image/gif
application/pdf
video/mp4
video/webm
video/quicktime
```

Recommended Blob folders:

```txt
profile/
projects/images/
projects/videos/
certificates/
cv/
```

Use client upload for large files so the file goes directly from browser to Vercel Blob.

---

## 11. YouTube URL Parser

Create:

```txt
src/lib/youtube.ts
```

Add:

```ts
export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "") || null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v");
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/embed/")[1]?.split("?")[0] || null;
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/shorts/")[1]?.split("?")[0] || null;
      }
    }

    return null;
  } catch {
    return null;
  }
}
```

Use this before saving YouTube project video data.

---

## 12. Project Video Component

Create:

```txt
src/app/modules/projects/components/project-video.tsx
```

Add:

```tsx
import type { ProjectVideo as ProjectVideoType } from "@/app/modules/shared/types/portfolio-data";

type Props = {
  video?: ProjectVideoType;
  title: string;
};

export function ProjectVideo({ video, title }: Props) {
  if (!video || video.source === "none") return null;

  if (video.source === "youtube" && video.youtubeVideoId) {
    const params = new URLSearchParams({
      autoplay: video.autoplay ? "1" : "0",
      mute: "1",
      controls: video.controls ? "1" : "0",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });

    if (video.loop) {
      params.set("loop", "1");
      params.set("playlist", video.youtubeVideoId);
    }

    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-cyan-500/10">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeVideoId}?${params.toString()}`}
            title={`${title} demo video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  if (video.source === "vercel" && (video.blobUrl || video.url)) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-cyan-500/10">
        <video
          className="aspect-video h-full w-full object-cover"
          src={video.blobUrl || video.url}
          autoPlay={video.autoplay ?? true}
          muted
          loop={video.loop ?? true}
          controls={video.controls ?? true}
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  return null;
}
```

Use this component in:

```txt
Featured project section
Project detail page
Project modal
```

Do not autoplay many heavy videos in the project grid. Use images/thumbnails in the grid and autoplay video only in featured/detail/modal.

---

## 13. API Route Update Pattern

Update all CRUD routes to use `portfolio-store.ts`.

Example:

```txt
GET /api/projects
  getPortfolioData()
  return projects

POST /api/projects
  admin only
  validate body
  add project
  savePortfolioData()

PATCH /api/projects/[id]
  admin only
  update project
  savePortfolioData()

DELETE /api/projects/[id]
  admin only
  delete project
  savePortfolioData()
```

Use same pattern for:

```txt
profile
skills
education
experience
certificates
services
settings
messages
```

Contact message create route can be public:

```txt
POST /api/messages
```

Admin message view/update/delete must be protected.

---

## 14. Admin Project Form Fields

Add fields:

```txt
Video Source
Video File Upload
YouTube URL
Autoplay
Muted
Loop
Show Controls
```

Default values:

```txt
autoplay: true
muted: true
loop: true
controls: true
```

Force muted to true for autoplay.

---

## 15. README Update

Update README with:

```txt
This portfolio does not use a traditional database.
Vercel Blob stores portfolio-data.json and uploaded files.
YouTube is used for large project demo videos.
Admin login uses environment variables.
```

Setup:

```bash
npm install
npm run dev
npm run build
```

Vercel deployment env variables:

```txt
NEXTAUTH_SECRET
NEXTAUTH_URL
ADMIN_EMAIL
ADMIN_PASSWORD
BLOB_READ_WRITE_TOKEN
PORTFOLIO_DATA_BLOB_PATH
```

---

## 16. Final Test Checklist

Before finishing, test:

```txt
npm run build works
No Prisma import errors
No DATABASE_URL needed
Admin login works
Admin can add/edit/delete projects
Video source none works
Video source Vercel Upload works
Video source YouTube Link works
YouTube video ID extracts correctly
Vercel uploaded video plays
YouTube embed plays
Videos autoplay muted
Contact messages save into portfolio-data.json
Portfolio data remains after refresh
Mobile UI works
```

---

## 17. Final Codex Task

Read this full file and update the existing project. Do not rebuild from zero unless the current project is broken. Replace database logic with Vercel Blob JSON storage. Add project video source selection with Vercel upload and YouTube link support. Make public project videos autoplay muted. Fix all TypeScript and build errors.
