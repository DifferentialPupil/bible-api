import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ translation: string; id: string }> }
) {
  try {
    const { translation, id } = await params;
    const idInt = parseInt(id);

    // Validate ID parameter
    if (isNaN(idInt) || idInt < 1) {
      return NextResponse.json(
        { error: "Invalid ID parameter" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const tableName = `${translation}_verses`;

    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Verse not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Failed to fetch verse" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 