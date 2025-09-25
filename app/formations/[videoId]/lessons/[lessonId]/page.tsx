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
import { VIDEOS } from "@app/formations/data";

// Server component
export default async function Page(props: {
  params: Promise<{ videoId: string; lessonId: string }>;
}) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  if (!video) {
    return <p>invalid video</p>;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const lesson = video.lessons.find((lesson) => lesson.id === params.lessonId);

  if (!lesson) {
    throw new Error("Invalid Lessons");
    return <p>invalid lesson</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Link
          href={`/formations/${video.id}`}
          className="text-indigo-500 hover:underline"
        >
          Back
        </Link>
      </CardFooter>
    </Card>
  );
}
