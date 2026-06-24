import type { PortfolioData } from "./types/portfolio-data";

const now = "2026-01-01T00:00:00.000Z";

export const defaultPortfolioData: PortfolioData = {
  profile: {
    fullName: "W.M. Prabodha Lakshan",
    professionalTitle: "IT Undergraduate & Developer",
    shortBio:
      "I build modern, responsive, and user-friendly web applications while growing my full-stack development and software engineering skills.",
    aboutText:
      "I am W.M. Prabodha Lakshan, an IT undergraduate from Sri Lanka with a strong interest in web development, software engineering, and modern web applications. I enjoy building practical projects, learning new technologies, and solving real-world problems through efficient digital solutions.",
    email: "admin@portfolio.dev",
    location: "Sri Lanka",
  },
  projects: [
    {
      id: "secure-portfolio",
      title: "Secure Developer Portfolio",
      slug: "secure-developer-portfolio",
      shortDescription:
        "A responsive portfolio and content dashboard built with modern Next.js.",
      description:
        "A personal portfolio focused on accessible presentation, secure administration, and maintainable content workflows.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
      category: "Next.js",
      featured: true,
      order: 0,
      video: {
        source: "none",
        autoplay: true,
        muted: true,
        loop: true,
        controls: true,
      },
      createdAt: now,
      updatedAt: now,
    },
  ],
  skills: [
    { id: "typescript", name: "TypeScript", category: "Development", level: 80, order: 0 },
    { id: "nextjs", name: "Next.js", category: "Development", level: 78, order: 1 },
    { id: "javascript", name: "JavaScript/ES6", category: "Development", level: 85, order: 2 },
  ],
  education: [],
  experience: [],
  certificates: [],
  services: [
    {
      id: "web-development",
      title: "Web Development",
      description: "Responsive, maintainable websites and web applications.",
      order: 0,
      active: true,
    },
  ],
  messages: [],
  settings: {
    siteTitle: "W.M. Prabodha Lakshan | Portfolio",
    metaDescription:
      "Portfolio of W.M. Prabodha Lakshan, an IT undergraduate and full-stack developer.",
    heroBadgeText: "Available for internships and projects",
    showServicesSection: true,
    showCertificatesSection: true,
    showExperienceSection: true,
    maintenanceMode: false,
  },
};
