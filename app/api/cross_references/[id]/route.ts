import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idInt = parseInt(id);

    // Validate ID parameter
    if (isNaN(idInt) || idInt < 1) {
      return NextResponse.json(
        { error: "Invalid ID parameter" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("cross_references")
      .select("*")
      .eq("id", idInt)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Cross reference not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Failed to fetch cross reference" },
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