import type { PropsWithChildren } from "react";
import { PageLayout } from "@/components/layout";
import Link from "next/link";
import { VIDEOS } from "../../data";
import { resolve } from "path";
import { notFound } from "next/navigation";

export default async function layout(
  props: PropsWithChildren<{ params: Promise<{ videoId: string }> }>
) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  if (!video) {
    notFound();
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <>
      <header className="border-b flex items-center gap-2 -mx-4 px-4 pb-2">
        <h3 className="font-bold">
          <Link href={`/formations/videos/${params.videoId}`}>
            {params.videoId}
          </Link>
        </h3>
        {video.lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/formations/videos/${params.videoId}/lessons/${lesson.id}`}
            className="text-xs font-medium text-indigo-500 hover:underline"
          >
            {lesson.title}
          </Link>
        ))}
        <Link
          href={`/formations/videos/${params.videoId}/lessons/404`}
          className="text-xs text-indigo-500 hover:underline"
        >
          404
        </Link>
      </header>
      {props.children}
    </>
  );
}
