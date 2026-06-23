import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { BLOB_ACCESS, isAllowedBlobAssetPath } from "@/lib/blob-assets";

export async function GET(
  request: Request,
  context: { params: Promise<{ pathname: string[] }> },
) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const { pathname } = await context.params;
  const blobPath = pathname.map(decodeURIComponent).join("/");

  if (!isAllowedBlobAssetPath(blobPath)) {
    return NextResponse.json({ error: "Blob asset not found" }, { status: 404 });
  }

  const result = await get(blobPath, { access: BLOB_ACCESS });
  if (!result || result.statusCode === 304) {
    return NextResponse.json({ error: "Blob asset not found" }, { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", result.blob.contentType);
  headers.set("Cache-Control", result.blob.cacheControl || "public, max-age=60");
  headers.set("ETag", result.blob.etag);

  const disposition = request.url.includes("download=1")
    ? result.blob.contentDisposition.replace(/^inline/i, "attachment")
    : result.blob.contentDisposition;
  if (disposition) headers.set("Content-Disposition", disposition);

  return new Response(result.stream, { headers });
}
