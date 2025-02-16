import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { translation: string; book_id: string } }
) {
  try {
    const bookId = parseInt(params.book_id);

    // Validate book_id parameter
    if (isNaN(bookId) || bookId < 1) {
      return NextResponse.json(
        { error: "Invalid book ID parameter" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from(`${params.translation}_books`)
      .select("*")
      .eq("id", bookId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Book not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Failed to fetch book" },
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