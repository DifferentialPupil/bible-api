import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ translation: string; book_id: string }> }
) {
  try {
    const { translation, book_id } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "50");
    const bookId = parseInt(book_id);

    // Validate book_id parameter
    if (isNaN(bookId) || bookId < 1) {
      return NextResponse.json(
        { error: "Invalid book ID parameter" },
        { status: 400 }
      );
    }

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

    // Get total count for the book
    const { count } = await supabase
      .from(`${translation}_verses`)
      .select("*", { count: "exact", head: true })
      .eq("book_id", bookId);

    // Get paginated verses for the book
    const { data, error } = await supabase
      .from(`${translation}_verses`)
      .select("*")
      .eq("book_id", bookId)
      .range(offset, offset + pageSize - 1)
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch verses" },
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