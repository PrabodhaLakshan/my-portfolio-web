import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";

const allowedContentTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const allowedFolders = [
  "profile/",
  "projects/images/",
  "projects/videos/",
  "certificates/",
  "cv/",
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody;
    if (body.type === "blob.generate-client-token" && !(await requireAdmin())) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const result = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (!allowedFolders.some((folder) => pathname.startsWith(folder))) {
          throw new Error("Invalid upload folder");
        }

        return {
          allowedContentTypes,
          maximumSizeInBytes: 50 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 },
    );
  }
}
