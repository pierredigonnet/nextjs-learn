import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { PageLayout } from "@/components/layout";
import { VIDEOS } from "@app/(formation-layout)/formations/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const videos = VIDEOS;
  const result = videos.flatMap((video) => {
    const params = video.lessons.map((lesson) => {
      return { videoId: video.id, lessonId: lesson.id };
    });
    return params;
  });

  return result;
}

type PageProps = {
  params: Promise<{ videoId: string; lessonId: string }>;
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const params = await props.params;
  const video = VIDEOS.find((video) => video.id === params.videoId);

  if (!video) {
    return <p>invalid video</p>;
  }

  const lesson = video.lessons.find((lesson) => lesson.id === params.lessonId);

  if (!lesson) {
    notFound();
  }

  return { title: `${video.title} • ${lesson.title}` };
};

// Server component
export default async function Page(props: PageProps) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  if (!video) {
    notFound();
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lesson = video.lessons.find((lesson) => lesson.id === params.lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Link
          href={`/formations/videos/${video.id}`}
          className="text-indigo-500 hover:underline"
        >
          Back
        </Link>
      </CardFooter>
    </Card>
  );
}
