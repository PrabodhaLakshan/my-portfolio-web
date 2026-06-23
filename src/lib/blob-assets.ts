import type { PortfolioData } from "@/app/modules/shared/types/portfolio-data";

export const BLOB_ACCESS = "private" as const;

const blobAssetFolders = [
  "profile/",
  "projects/images/",
  "projects/videos/",
  "certificates/",
  "cv/",
];

const blobFileRoutePrefix = "/api/blob/files/";

export function isAllowedBlobAssetPath(pathname: string) {
  return blobAssetFolders.some((folder) => pathname.startsWith(folder));
}

export function getAppBaseUrl() {
  const configuredUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL;
  if (!configuredUrl) return undefined;
  return configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`;
}

export function getBlobFilePath(pathname: string) {
  return `${blobFileRoutePrefix}${pathname
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

export function getBlobFileUrl(pathname: string, baseUrl?: string) {
  const path = getBlobFilePath(pathname);
  if (baseUrl) return new URL(path, baseUrl).toString();
  if (typeof window !== "undefined") return new URL(path, window.location.origin).toString();
  return path;
}

export function pathnameFromBlobAssetUrl(value?: string | null) {
  if (!value) return null;

  if (value.startsWith(blobFileRoutePrefix)) {
    return decodeURIComponent(value.slice(blobFileRoutePrefix.length));
  }

  try {
    const url = new URL(value);
    if (url.pathname.startsWith(blobFileRoutePrefix)) {
      return decodeURIComponent(url.pathname.slice(blobFileRoutePrefix.length));
    }
    if (url.hostname.endsWith(".blob.vercel-storage.com")) {
      return decodeURIComponent(url.pathname.replace(/^\/+/, ""));
    }
  } catch {
    return null;
  }

  return null;
}

export function toServedBlobAssetUrl(value?: string | null, baseUrl?: string) {
  const pathname = pathnameFromBlobAssetUrl(value);
  return pathname && isAllowedBlobAssetPath(pathname)
    ? getBlobFileUrl(pathname, baseUrl)
    : value;
}

export function toServedPortfolioAssetUrls(data: PortfolioData, baseUrl = getAppBaseUrl()) {
  const portfolio = structuredClone(data);

  portfolio.profile.profileImageUrl = toServedBlobAssetUrl(portfolio.profile.profileImageUrl, baseUrl) ?? undefined;
  portfolio.profile.cvUrl = toServedBlobAssetUrl(portfolio.profile.cvUrl, baseUrl) ?? undefined;

  portfolio.projects = portfolio.projects.map((project) => ({
    ...project,
    imageUrl: toServedBlobAssetUrl(project.imageUrl, baseUrl) ?? undefined,
    video: project.video
      ? {
          ...project.video,
          blobUrl: toServedBlobAssetUrl(project.video.blobUrl, baseUrl) ?? undefined,
          url: toServedBlobAssetUrl(project.video.url, baseUrl) ?? undefined,
        }
      : project.video,
  }));

  portfolio.certificates = portfolio.certificates.map((certificate) => ({
    ...certificate,
    imageUrl: toServedBlobAssetUrl(certificate.imageUrl, baseUrl) ?? undefined,
  }));

  return portfolio;
}
