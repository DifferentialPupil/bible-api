import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-4 md:p-8">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is the API testing interface where you can try out all available endpoints
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Translations Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Translations</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Get All Translations</h3>
              <code className="block bg-muted p-2 rounded">GET /api/translations</code>
              <a href="/api/translations" target="_blank" className="mt-2 inline-block text-sm text-primary hover:underline">
                Try it →
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Get Translation Details</h3>
              <code className="block bg-muted p-2 rounded">GET /api/translations/[translation]</code>
              <div className="mt-2 space-x-2">
                <a href="/api/translations/KJV" target="_blank" className="text-sm text-primary hover:underline">Try KJV →</a>
                <a href="/api/translations/ASV" target="_blank" className="text-sm text-primary hover:underline">Try ASV →</a>
              </div>
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Books</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Get All Books</h3>
              <code className="block bg-muted p-2 rounded">GET /api/[translation]/books</code>
              <div className="mt-2 space-x-2">
                <a href="/api/KJV/books" target="_blank" className="text-sm text-primary hover:underline">KJV Books →</a>
                <a href="/api/ASV/books" target="_blank" className="text-sm text-primary hover:underline">ASV Books →</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Get Book Details</h3>
              <code className="block bg-muted p-2 rounded">GET /api/[translation]/books/[book_id]</code>
              <div className="mt-2 space-x-2">
                <a href="/api/KJV/books/1" target="_blank" className="text-sm text-primary hover:underline">KJV Genesis →</a>
                <a href="/api/ASV/books/1" target="_blank" className="text-sm text-primary hover:underline">ASV Genesis →</a>
              </div>
            </div>
          </div>
        </div>

        {/* Verses Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Verses</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Get Verses (Paginated)</h3>
              <code className="block bg-muted p-2 rounded">GET /api/[translation]/verses?page=1&pageSize=10</code>
              <div className="mt-2 space-x-2">
                <a href="/api/KJV/verses?page=1&pageSize=10" target="_blank" className="text-sm text-primary hover:underline">KJV Verses →</a>
                <a href="/api/ASV/verses?page=1&pageSize=10" target="_blank" className="text-sm text-primary hover:underline">ASV Verses →</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Get Verse Details</h3>
              <code className="block bg-muted p-2 rounded">GET /api/[translation]/verses/[id]</code>
              <div className="mt-2 space-x-2">
                <a href="/api/KJV/verses/1" target="_blank" className="text-sm text-primary hover:underline">KJV Genesis 1:1 →</a>
                <a href="/api/ASV/verses/1" target="_blank" className="text-sm text-primary hover:underline">ASV Genesis 1:1 →</a>
              </div>
            </div>
          </div>
        </div>

        {/* Cross References Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Cross References</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Get Cross References (Paginated)</h3>
              <code className="block bg-muted p-2 rounded">GET /api/cross_references?page=1&pageSize=10</code>
              <a href="/api/cross_references?page=1&pageSize=10" target="_blank" className="mt-2 inline-block text-sm text-primary hover:underline">
                Try it →
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Get Cross Reference Details</h3>
              <code className="block bg-muted p-2 rounded">GET /api/cross_references/[id]</code>
              <a href="/api/cross_references/1" target="_blank" className="mt-2 inline-block text-sm text-primary hover:underline">
                Try ID: 1 →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-xl mb-4">Your User Details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
