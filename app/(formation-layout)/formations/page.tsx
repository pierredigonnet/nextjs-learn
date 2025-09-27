import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { PageLayout } from "@/components/layout";
import { VIDEOS } from "./data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan de formation",
  description: "meilleure formation du monde mon chou, profites-en !!",
};

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan de Formation</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {VIDEOS.map((video) => {
          return (
            <Link
              key={video.id}
              href={`/formations/videos/${video.id}`}
              className="text-indigo-500 underline"
            >
              {video.title}
            </Link>
          );
        })}
        <Link
          href={`/formations/videos/404`}
          className="text-indigo-500 underline"
        >
          404
        </Link>
      </CardContent>
    </Card>
  );
}
