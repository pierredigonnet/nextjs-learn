import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { PageLayout } from "@/components/layout";
import { VIDEOS } from "./data";

export default function Page() {
  return (
    <PageLayout>
      <Card>
        <CardHeader>
          <CardTitle>Plan de Formation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {VIDEOS.map((video) => {
            return (
              <Link
                key={video.id}
                href={`/formations/${video.id}`}
                className="text-indigo-500 underline"
              >
                {video.title}
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </PageLayout>
  );
}
