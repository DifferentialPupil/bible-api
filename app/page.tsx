import { InfoIcon, BookIcon, BookOpenIcon, ArrowRightIcon, GitCompareIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Endpoint {
  method: string;
  path: string;
  description: string;
  parameters?: {
    path?: { name: string; description: string }[];
    query?: { name: string; description: string; optional?: boolean }[];
  };
}

interface EndpointGroup {
  title: string;
  description: string;
  icon: React.ReactNode;
  endpoints: Endpoint[];
}

export default async function APIPage() {
  const endpointGroups: EndpointGroup[] = [
    {
      title: "Translations",
      description: "Endpoints for managing Bible translations",
      icon: <BookIcon className="w-5 h-5" />,
      endpoints: [
        {
          method: "GET",
          path: "/api/translations",
          description: "Retrieve a list of all available Bible translations",
        },
        {
          method: "GET",
          path: "/api/translations/{translation}",
          description: "Retrieve detailed metadata for a single translation",
          parameters: {
            path: [
              {
                name: "translation",
                description: "The Bible translation abbreviation (e.g., 'NIV', 'ESV')",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Books",
      description: "Endpoints for accessing Bible books",
      icon: <BookOpenIcon className="w-5 h-5" />,
      endpoints: [
        {
          method: "GET",
          path: "/api/{translation}/books",
          description: "Retrieve a list of all books in the specified Bible translation",
          parameters: {
            path: [
              {
                name: "translation",
                description: "The translation abbreviation",
              },
            ],
          },
        },
        {
          method: "GET",
          path: "/api/{translation}/books/{book_id}",
          description: "Retrieve details of a specific book",
          parameters: {
            path: [
              {
                name: "translation",
                description: "The translation abbreviation",
              },
              {
                name: "book_id",
                description: "The unique identifier of the book",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Verses",
      description: "Endpoints for retrieving Bible verses",
      icon: <ArrowRightIcon className="w-5 h-5" />,
      endpoints: [
        {
          method: "GET",
          path: "/api/{translation}/verses",
          description: "Retrieve verses in the specified translation, with optional filtering",
          parameters: {
            path: [
              {
                name: "translation",
                description: "The translation abbreviation",
              },
            ],
            query: [
              {
                name: "book_id",
                description: "Filter by book",
                optional: true,
              },
              {
                name: "chapter",
                description: "Filter by chapter",
                optional: true,
              },
              {
                name: "verse",
                description: "Filter by verse number",
                optional: true,
              },
              {
                name: "limit",
                description: "Number of results to return",
                optional: true,
              },
              {
                name: "offset",
                description: "Number of results to skip",
                optional: true,
              },
            ],
          },
        },
        {
          method: "GET",
          path: "/api/{translation}/verses/{id}",
          description: "Retrieve the details of a specific verse using its unique ID",
          parameters: {
            path: [
              {
                name: "translation",
                description: "The translation abbreviation",
              },
              {
                name: "id",
                description: "The verse ID",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Cross References",
      description: "Endpoints for managing verse cross-references",
      icon: <GitCompareIcon className="w-5 h-5" />,
      endpoints: [
        {
          method: "GET",
          path: "/api/cross-references",
          description: "Retrieve a list of all cross references",
          parameters: {
            query: [
              {
                name: "from_book",
                description: "Filter by originating book",
                optional: true,
              },
              {
                name: "from_chapter",
                description: "Filter by originating chapter",
                optional: true,
              },
              {
                name: "from_verse",
                description: "Filter by originating verse",
                optional: true,
              },
              {
                name: "to_book",
                description: "Filter by referenced book",
                optional: true,
              },
              {
                name: "to_chapter",
                description: "Filter by referenced chapter",
                optional: true,
              },
              {
                name: "to_verse_start",
                description: "Filter by referenced verse start",
                optional: true,
              },
              {
                name: "to_verse_end",
                description: "Filter by referenced verse end",
                optional: true,
              },
              {
                name: "min_votes",
                description: "Filter by minimum number of votes",
                optional: true,
              },
            ],
          },
        },
        {
          method: "GET",
          path: "/api/cross-references/{id}",
          description: "Retrieve details for a specific cross reference",
          parameters: {
            path: [
              {
                name: "id",
                description: "The cross reference ID",
              },
            ],
          },
        },
      ],
    },
  ];

  return (
    <div className="flex-1 w-full flex flex-col gap-12 p-4 md:p-8">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center mb-8">
          <InfoIcon size="16" strokeWidth={2} />
          This is the API documentation for the Bible API. All endpoints require authentication.
        </div>

        <div className="space-y-12">
          {endpointGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <div className="flex items-center gap-2">
                {group.icon}
                <h2 className="text-2xl font-bold">{group.title}</h2>
              </div>
              <p className="text-muted-foreground">{group.description}</p>
              
              <div className="space-y-6">
                {group.endpoints.map((endpoint) => (
                  <div key={endpoint.path} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{endpoint.method}</Badge>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{endpoint.path}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                    
                    {(endpoint.parameters?.path || endpoint.parameters?.query) && (
                      <div className="space-y-3">
                        {endpoint.parameters.path && (
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Path Parameters</h4>
                            <div className="space-y-2">
                              {endpoint.parameters.path.map((param) => (
                                <div key={param.name} className="text-sm">
                                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{param.name}</code>
                                  <span className="text-muted-foreground ml-2">{param.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {endpoint.parameters.query && (
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Query Parameters</h4>
                            <div className="space-y-2">
                              {endpoint.parameters.query.map((param) => (
                                <div key={param.name} className="text-sm">
                                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{param.name}</code>
                                  {param.optional && (
                                    <Badge variant="secondary" className="ml-2 text-xs">Optional</Badge>
                                  )}
                                  <span className="text-muted-foreground ml-2">{param.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
