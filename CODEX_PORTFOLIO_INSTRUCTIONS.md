# Codex Instructions: Personal Portfolio Website

## Project Owner

Build a personal portfolio website for:

```txt
Name: W.M. Prabodha Lakshan
Portfolio Type: Personal Portfolio
Main Role: Cyber Security Undergraduate / IT Student
Country: Sri Lanka
Hosting Target: Vercel
```

This file is for **Codex in VS Code**. Codex must read this full file first and then implement the project.

---

## 1. Main Goal

Create a modern, responsive, animated personal portfolio website using **Next.js App Router**.

The website must include:

1. A public portfolio website.
2. A secure admin panel.
3. Admin forms to update portfolio content.
4. CRUD features for projects, skills, education, experience, certificates, services, profile details, site settings, and contact messages.
5. Vercel-ready deployment setup.

The design must be **dark, modern, glassmorphism, blur-based, cyber/IT themed, professional, and active-looking**.

---

## 2. Required Tech Stack

Use this tech stack:

```txt
Framework: Next.js with App Router
Language: TypeScript
Styling: Tailwind CSS
UI Library: shadcn/ui
Animation: Framer Motion
Forms: React Hook Form
Validation: Zod
Icons: Lucide React
Theme: next-themes
Database: PostgreSQL
ORM: Prisma
Authentication: Auth.js / NextAuth Credentials Provider
Password Hashing: bcryptjs
Deployment: Vercel
```

Use clean, readable, production-ready code.

---

## 3. Required Folder Structure

Use this exact structure as much as possible.

```txt
src/
  app/
    (auth)/
      login/
        page.tsx

    (protected)/
      admin/
        layout.tsx
        page.tsx
        profile/
          page.tsx
        projects/
          page.tsx
          new/
            page.tsx
          [id]/
            edit/
              page.tsx
        skills/
          page.tsx
        education/
          page.tsx
        experience/
          page.tsx
        certificates/
          page.tsx
        services/
          page.tsx
        messages/
          page.tsx
        settings/
          page.tsx

    api/
      auth/
        [...nextauth]/
          route.ts
      profile/
        route.ts
      projects/
        route.ts
      projects/
        [id]/
          route.ts
      skills/
        route.ts
      skills/
        [id]/
          route.ts
      education/
        route.ts
      education/
        [id]/
          route.ts
      experience/
        route.ts
      experience/
        [id]/
          route.ts
      certificates/
        route.ts
      certificates/
        [id]/
          route.ts
      services/
        route.ts
      services/
        [id]/
          route.ts
      messages/
        route.ts
      messages/
        [id]/
          route.ts
      settings/
        route.ts

    modules/
      home/
        components/
        actions.ts
        types.ts
      admin/
        components/
        actions.ts
        types.ts
      projects/
        components/
        actions.ts
        types.ts
      profile/
        components/
        actions.ts
        types.ts
      skills/
        components/
        actions.ts
        types.ts
      education/
        components/
        actions.ts
        types.ts
      experience/
        components/
        actions.ts
        types.ts
      certificates/
        components/
        actions.ts
        types.ts
      services/
        components/
        actions.ts
        types.ts
      shared/
        components/
        utils/

    layout.tsx
    page.tsx
    globals.css

  components/
    ui/
    layout/
    common/

  lib/
    auth.ts
    prisma.ts
    validations/
    utils.ts

  prisma/
    schema.prisma
    seed.ts

  middleware.ts
```

If Next.js creates a slightly different base structure, keep these main route groups:

```txt
(auth)
(protected)
api
modules
```

---

## 4. Public Website Requirements

Create a one-page portfolio homepage with smooth-scroll navigation.

Public URL:

```txt
/
```

Required public sections:

### 4.1 Navbar

Create a sticky transparent navbar with blur effect.

Navbar links:

```txt
Home
About
Skills
Projects
Education
Experience
Certificates
Services
Contact
```

Also include:

```txt
Theme toggle
Admin login link
Mobile menu
```

### 4.2 Hero Section

Use:

```txt
Name: W.M. Prabodha Lakshan
Title: Cyber Security Undergraduate
Subtitle: Personal Portfolio
```

Hero must include:

```txt
Short introduction
Profile image placeholder
Animated background blobs
Gradient text
CTA button: View Projects
CTA button: Contact Me
CTA button: Download CV
```

### 4.3 About Section

Show:

```txt
Personal introduction
Academic background
Career goal
Interests
```

All content must be editable from the admin panel.

### 4.4 Skills Section

Show skills by category:

```txt
Frontend
Backend
Database
Cyber Security
Tools
Soft Skills
```

Each skill must have:

```txt
Skill name
Category
Level percentage
Icon or simple badge
Display order
```

### 4.5 Projects Section

Show project cards.

Each project must have:

```txt
Title
Short description
Full description
Tech stack tags
Category
Image URL
GitHub URL
Live demo URL
Featured status
Display order
```

Add category filtering:

```txt
All
Web Development
Cyber Security
MERN
Next.js
Academic
Other
```

### 4.6 Education Section

Each education item must show:

```txt
Program
Institute
Start year
End year
Description
Achievements
```

### 4.7 Experience Section

Each experience item must show:

```txt
Role
Organization
Type
Start date
End date
Currently working status
Description
Technologies
```

Experience can include internship, academic projects, volunteer work, freelance work, and club activities.

### 4.8 Certificates Section

Each certificate card must show:

```txt
Certificate title
Issuer
Issued date
Credential URL
Image URL
Description
```

### 4.9 Services Section

This section is optional and can be hidden from admin settings.

Default services:

```txt
Portfolio Website Development
Web Application Development
UI/UX Landing Page Design
Basic Cyber Security Testing
```

### 4.10 Contact Section

Create contact form:

```txt
Name
Email
Subject
Message
Submit button
```

On submit:

```txt
Validate using Zod
Save message to database
Show success toast
Show error toast if failed
```

Also show editable contact details:

```txt
Email
Phone
Location
GitHub
LinkedIn
Facebook
Instagram
WhatsApp
```

### 4.11 Footer

Footer must include:

```txt
Name
Short tagline
Quick links
Social links
Copyright
```

---

## 5. Admin Panel Requirements

Admin URL:

```txt
/admin
```

Login URL:

```txt
/login
```

Admin panel must be protected. Unauthenticated users must be redirected to `/login`.

### 5.1 Admin Authentication

Use Auth.js / NextAuth Credentials Provider.

Requirements:

```txt
Admin email and password login
Password stored as hashed password using bcryptjs
Use Prisma adapter or custom credentials check
Protect all /admin routes using middleware
After login redirect to /admin
After logout redirect to /login
```

Use environment variables:

```txt
NEXTAUTH_SECRET=
NEXTAUTH_URL=
DATABASE_URL=
```

Add seed admin user in `prisma/seed.ts`.

Default development admin:

```txt
Email: admin@portfolio.dev
Password: Admin@12345
```

Important: Add a comment that the password must be changed before production deployment.

### 5.2 Admin Layout

Admin layout must include:

```txt
Sidebar
Topbar
Logout button
Responsive mobile sidebar
Dark glass dashboard style
```

Sidebar menu:

```txt
Dashboard
Profile
Projects
Skills
Education
Experience
Certificates
Services
Messages
Settings
Visit Website
Logout
```

### 5.3 Dashboard Page

Dashboard cards:

```txt
Total Projects
Total Skills
Total Certificates
Total Messages
Unread Messages
Featured Projects
Last Updated Content
```

Also include quick action buttons:

```txt
Add New Project
Edit Profile
View Messages
Open Website
```

### 5.4 Profile Management

Admin must be able to edit:

```txt
Full name
Professional title
Short bio
Long about text
Profile image URL
CV download URL
Email
Phone
Location
GitHub URL
LinkedIn URL
Facebook URL
Instagram URL
WhatsApp URL
```

Use a clean form with validation.

### 5.5 Project CRUD

Admin must be able to:

```txt
Create project
Edit project
Delete project
Mark project as featured
Add image URL
Add GitHub URL
Add live demo URL
Add tech stack tags
Add category
Set display order
```

Project fields:

```txt
title
slug
shortDescription
description
techStack
category
imageUrl
githubUrl
liveUrl
featured
order
createdAt
updatedAt
```

### 5.6 Skills CRUD

Skill fields:

```txt
name
category
level
icon
order
createdAt
updatedAt
```

### 5.7 Education CRUD

Education fields:

```txt
program
institute
startYear
endYear
description
achievements
order
createdAt
updatedAt
```

### 5.8 Experience CRUD

Experience fields:

```txt
role
organization
type
startDate
endDate
currentlyWorking
description
technologies
order
createdAt
updatedAt
```

### 5.9 Certificates CRUD

Certificate fields:

```txt
title
issuer
issuedDate
credentialUrl
imageUrl
description
order
createdAt
updatedAt
```

### 5.10 Services CRUD

Service fields:

```txt
title
description
icon
priceText
order
active
createdAt
updatedAt
```

### 5.11 Contact Messages

Contact messages must be saved in the database.

Admin can:

```txt
View all messages
View message details
Mark as read
Mark as unread
Delete message
```

Message fields:

```txt
name
email
subject
message
status
createdAt
updatedAt
```

### 5.12 Site Settings

Admin can edit:

```txt
Site title
Meta description
Hero badge text
Primary color
Accent color
Show/hide services section
Show/hide certificates section
Show/hide experience section
Maintenance mode
```

---

## 6. Prisma Database Schema

Create these Prisma models:

```txt
AdminUser
Profile
Project
Skill
Education
Experience
Certificate
Service
ContactMessage
SiteSettings
```

Use PostgreSQL.

Recommended schema:

```prisma
model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id                 String   @id @default(cuid())
  fullName           String
  professionalTitle  String
  shortBio           String
  aboutText          String
  profileImageUrl    String?
  cvUrl              String?
  email              String?
  phone              String?
  location           String?
  githubUrl          String?
  linkedinUrl        String?
  facebookUrl        String?
  instagramUrl       String?
  whatsappUrl        String?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

model Project {
  id               String   @id @default(cuid())
  title            String
  slug             String   @unique
  shortDescription String
  description      String
  techStack        String[]
  category         String
  imageUrl         String?
  githubUrl        String?
  liveUrl          String?
  featured         Boolean  @default(false)
  order            Int      @default(0)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model Skill {
  id        String   @id @default(cuid())
  name      String
  category  String
  level     Int
  icon      String?
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Education {
  id           String   @id @default(cuid())
  program      String
  institute    String
  startYear    String
  endYear      String?
  description  String
  achievements String[]
  order        Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Experience {
  id               String   @id @default(cuid())
  role             String
  organization     String
  type             String
  startDate        DateTime
  endDate          DateTime?
  currentlyWorking Boolean  @default(false)
  description      String
  technologies     String[]
  order            Int      @default(0)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model Certificate {
  id            String   @id @default(cuid())
  title         String
  issuer        String
  issuedDate    DateTime
  credentialUrl String?
  imageUrl      String?
  description   String?
  order         Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Service {
  id          String   @id @default(cuid())
  title       String
  description String
  icon        String?
  priceText   String?
  order       Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  status    String   @default("unread")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model SiteSettings {
  id                       String   @id @default(cuid())
  siteTitle                String
  metaDescription          String
  heroBadgeText            String?
  primaryColor             String?
  accentColor              String?
  showServicesSection      Boolean  @default(true)
  showCertificatesSection  Boolean  @default(true)
  showExperienceSection    Boolean  @default(true)
  maintenanceMode          Boolean  @default(false)
  createdAt                DateTime @default(now())
  updatedAt                DateTime @updatedAt
}
```

If Prisma or PostgreSQL has compatibility issues with scalar lists, replace `String[]` with JSON fields.

---

## 7. API Route Requirements

Create API routes for all major CRUD operations.

Each API route must return this response shape:

```ts
{
  success: boolean;
  message: string;
  data?: unknown;
}
```

Use these HTTP methods:

```txt
GET
POST
PATCH
DELETE
```

Validation:

```txt
Use Zod for all create/update request bodies.
Return 400 for validation errors.
Return 401 for unauthenticated admin requests.
Return 404 for missing records.
Return 500 for unexpected server errors.
```

Public API:

```txt
Contact message create endpoint can be public.
Portfolio data GET endpoints can be public.
Create/update/delete endpoints must be protected.
```

---

## 8. Server Actions

Create server actions where suitable.

Example action files:

```txt
src/app/modules/projects/actions.ts
src/app/modules/profile/actions.ts
src/app/modules/admin/actions.ts
```

Recommended server actions:

```txt
getProfile
updateProfile
getProjects
createProject
updateProject
deleteProject
getSkills
createSkill
updateSkill
deleteSkill
getEducation
createEducation
updateEducation
deleteEducation
getExperience
createExperience
updateExperience
deleteExperience
getCertificates
createCertificate
updateCertificate
deleteCertificate
getServices
createService
updateService
deleteService
getMessages
markMessageRead
deleteMessage
getSettings
updateSettings
```

---

## 9. Validation Requirements

Create Zod schemas inside:

```txt
src/lib/validations/
```

Files:

```txt
profile.ts
project.ts
skill.ts
education.ts
experience.ts
certificate.ts
service.ts
message.ts
settings.ts
auth.ts
```

Validation examples:

```txt
Email must be valid.
Skill level must be between 0 and 100.
Project title is required.
Slug must be unique.
URL fields must be optional but valid URLs when provided.
Message must not be empty.
```

---

## 10. UI Design Requirements

Use this visual direction:

```txt
Theme: dark cyber-modern
Background: black / near-black gradient
Glass panels: backdrop-blur, transparent borders
Colors: cyan, purple, blue, violet, white
Effects: glow borders, hover scale, smooth transitions
Animations: fade-up, slide-in, floating blobs
Typography: professional and clean
Mobile: fully responsive
```

Do not make it childish or too colorful.

Use these Tailwind style ideas:

```txt
bg-slate-950
bg-black
bg-white/5
border-white/10
backdrop-blur-xl
text-slate-100
text-slate-400
from-cyan-400
via-blue-500
to-violet-500
shadow-cyan-500/20
rounded-2xl
```

---

## 11. Required Reusable Components

Create reusable components:

```txt
Navbar
Footer
SectionHeading
GlassCard
GradientButton
ProjectCard
SkillBadge
ContactForm
AdminSidebar
AdminTopbar
DashboardCard
DataTable
ConfirmDeleteDialog
FormInput
FormTextarea
FormSelect
ImageUrlInput
ThemeToggle
EmptyState
LoadingSpinner
ToastProvider
```

Use shadcn/ui components where useful:

```txt
Button
Card
Input
Textarea
Select
Dialog
DropdownMenu
Sheet
Table
Badge
Tabs
Switch
Toast/Sonner
```

---

## 12. Public Homepage Content Defaults

Use this default content, but make it editable from admin.

### Hero

```txt
Badge: Available for internships and projects
Title: Hi, I am W.M. Prabodha Lakshan
Role: Cyber Security Undergraduate
Intro: I build secure, modern, and user-friendly web applications while continuously improving my cyber security and full-stack development skills.
```

### About

```txt
I am W.M. Prabodha Lakshan, an IT undergraduate from Sri Lanka with a strong interest in cyber security, web development, and modern software engineering. I enjoy building practical projects, learning new technologies, and solving real-world problems through secure and efficient digital solutions.
```

### Default Skills

```txt
Next.js
React.js
Node.js
Express.js
MongoDB
PostgreSQL
Prisma
JavaScript
TypeScript
Tailwind CSS
Git
GitHub
Linux
Networking
Cyber Security Basics
Web Security
```

### Default Projects

Add 2 or 3 placeholder projects that admin can edit later:

```txt
Smart Agriculture IoT Dashboard
Personal Portfolio Website
Cyber Security Lab Practice
```

---

## 13. Deployment Requirements

The project must be ready for Vercel deployment.

Add:

```txt
.env.example
README.md
prisma seed command
build command support
```

Expected commands:

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
npm run build
```

Vercel environment variables:

```txt
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

For production database, use one of:

```txt
Vercel Postgres
Neon
Supabase PostgreSQL
Railway PostgreSQL
```

---

## 14. Security Requirements

Implement these security practices:

```txt
Never store plain text passwords.
Hash admin passwords using bcryptjs.
Protect all admin routes.
Validate all forms using Zod.
Sanitize/validate URLs.
Do not expose admin APIs publicly.
Use environment variables for secrets.
Do not commit .env file.
Show generic login error message.
```

Middleware must protect:

```txt
/admin
/admin/*
```

---

## 15. Step-by-Step Implementation Plan for Codex

Follow these phases.

### Phase 1: Setup

1. Create Next.js app with TypeScript.
2. Install dependencies.
3. Setup Tailwind CSS.
4. Setup shadcn/ui.
5. Setup Prisma.
6. Setup Auth.js / NextAuth.
7. Create `.env.example`.
8. Create basic folder structure.

### Phase 2: Database

1. Create Prisma schema.
2. Create seed file.
3. Seed admin user.
4. Seed default portfolio data.
5. Create Prisma client helper.

### Phase 3: Authentication

1. Implement credentials login.
2. Create login page.
3. Add middleware protection.
4. Add logout button.
5. Test protected admin routes.

### Phase 4: Public Portfolio UI

1. Create layout.
2. Create navbar and footer.
3. Create homepage sections.
4. Connect sections to database data.
5. Add animations.
6. Make fully responsive.

### Phase 5: Admin Dashboard

1. Create admin layout.
2. Create dashboard cards.
3. Create sidebar and topbar.
4. Create all admin pages.
5. Add CRUD forms and tables.

### Phase 6: API and Actions

1. Create API routes.
2. Add Zod validation.
3. Add protected create/update/delete logic.
4. Add contact form message saving.
5. Add error handling.

### Phase 7: Polish

1. Add loading states.
2. Add empty states.
3. Add confirmation dialogs.
4. Add toast notifications.
5. Improve mobile UI.
6. Check accessibility.
7. Fix TypeScript errors.
8. Run build.

### Phase 8: Deployment

1. Add README deployment guide.
2. Add Vercel environment variable instructions.
3. Test production build.
4. Prepare final commit.

---

## 16. Important Rules for Codex

Follow these rules strictly:

```txt
Use TypeScript everywhere.
Use App Router, not Pages Router.
Use server components where possible.
Use client components only when needed.
Do not hardcode portfolio content except seed/default data.
Admin must be able to update most portfolio content using forms.
Do not skip authentication.
Do not skip database integration.
Do not skip mobile responsiveness.
Do not leave broken imports.
Do not leave TODO comments for core features.
Do not use dummy buttons that do nothing.
Do not ignore TypeScript errors.
```

---

## 17. Final Output Expected from Codex

When the project is complete, provide:

```txt
1. Summary of created files.
2. Setup commands.
3. How to run locally.
4. How to login to admin.
5. How to deploy to Vercel.
6. Any environment variables required.
```

---

## 18. Local Development Commands

Use these commands:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

If `npm run seed` does not exist, add it to `package.json`:

```json
{
  "scripts": {
    "seed": "tsx src/prisma/seed.ts"
  }
}
```

---

## 19. Admin Panel Form Priority

The most important part is the admin panel.

Make sure these admin pages have working forms:

```txt
/admin/profile
/admin/projects
/admin/skills
/admin/education
/admin/experience
/admin/certificates
/admin/services
/admin/settings
/admin/messages
```

Admin panel must allow me to add my academic details and project details easily.

---

## 20. Design Quality Checklist

Before finishing, check:

```txt
Homepage looks modern and premium.
Dark blur/glass effect is visible.
All sections are responsive.
Admin panel is clean and easy to use.
Forms have validation errors.
Buttons have hover effects.
No page is empty.
No broken links.
No TypeScript errors.
Build passes.
```

---

## 21. Final Reminder

This is a personal portfolio for **W.M. Prabodha Lakshan**.

The website must look suitable for:

```txt
Internship applications
Cyber security student portfolio
Full-stack project showcase
Professional personal branding
```

Focus on quality, responsiveness, clean code, and a strong admin panel.
