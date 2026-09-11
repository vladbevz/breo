import { NextResponse } from "next/server";
import { getPublicDesignFields } from "@/lib/designs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const design = await getPublicDesignFields(id);

  if (!design) {
    return NextResponse.json({ error: "Modèle introuvable." }, { status: 404 });
  }

  return NextResponse.json(design);
}
