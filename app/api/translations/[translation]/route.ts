import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ translation: string }> }
) {
  try {
    const { translation } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("translations")
      .select("*")
      .eq("translation", translation)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Translation not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Failed to fetch translation" },
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