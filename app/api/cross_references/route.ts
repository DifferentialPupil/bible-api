import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    
    // Validate pagination parameters
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page parameter" },
        { status: 400 }
      );
    }
    
    if (isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
      return NextResponse.json(
        { error: "Invalid pageSize parameter. Must be between 1 and 100" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Calculate offset
    const offset = (page - 1) * pageSize;

    // Get total count
    const { count } = await supabase
      .from("cross_references")
      .select("*", { count: "exact", head: true });

    // Get paginated data
    const { data, error } = await supabase
      .from("cross_references")
      .select("*")
      .range(offset, offset + pageSize - 1)
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch cross references" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        pageSize,
        total: count,
        totalPages: Math.ceil((count || 0) / pageSize)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
