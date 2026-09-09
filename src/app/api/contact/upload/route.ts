import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 15 * 1024 * 1024;

// application/octet-stream en repli : les formats vectoriels pro (.ai/.eps) sont
// signalés de façon incohérente selon navigateur/OS — la taille reste le
// garde-fou fiable côté serveur, le type est une défense en profondeur.
const ALLOWED_CONTENT_TYPES = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "application/pdf",
  "application/postscript",
  "application/illustrator",
  "application/octet-stream",
];

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_CONTENT_TYPES,
        maximumSizeInBytes: MAX_FILE_SIZE,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async ({ blob }) => {
        console.log("[contact/upload] completed:", blob.pathname);
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("[contact/upload] handleUpload error:", error);
    return NextResponse.json({ error: "Upload rejected." }, { status: 400 });
  }
}
