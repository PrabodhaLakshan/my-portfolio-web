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

export type Profile = PortfolioData["profile"];
export type Project = PortfolioData["projects"][number];
export type Skill = PortfolioData["skills"][number];
export type Education = PortfolioData["education"][number];
export type Experience = PortfolioData["experience"][number];
export type Certificate = PortfolioData["certificates"][number];
export type Service = PortfolioData["services"][number];
export type ContactMessage = PortfolioData["messages"][number];
export type SiteSettings = PortfolioData["settings"];
