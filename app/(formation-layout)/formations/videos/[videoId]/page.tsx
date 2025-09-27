import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { PageLayout } from "@/components/layout";
import { VIDEOS } from "../../data";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const videos = VIDEOS;
  return videos.map((video) => ({ videoId: video.id }));
}

type PageProps = {
  params: Promise<{ videoId: string }>;
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const params = await props.params;
  const video = VIDEOS.find((video) => video.id === params.videoId);

  return { title: `video : ${video?.title}` };
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  if (!video) {
    //TODO Changer
    return <p>invalid video</p>;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{video.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="list-disc list-inside">
          {video.lessons.map((lesson) => (
            <li key={lesson.title}>
              <span>{lesson.title} </span>
              <Link
                href={`/formations/videos/${video.id}/lessons/${lesson.id}`}
                className="text-indigo-500"
              >
                {`→`}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href="/formations" className="text-indigo-500 hover:underline">
          Back
        </Link>
      </CardFooter>
    </Card>
  );
}
