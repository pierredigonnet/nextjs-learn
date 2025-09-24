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

  // Debug: afficher les paramètres
  console.log("params.videoId:", params.videoId);
  console.log("params.lessonId:", params.lessonId);

  const video = VIDEOS.find((video) => video.id === params.videoId);

  if (!video) {
    return <p>invalid video</p>;
  }

  const lesson = video.lessons.find((lesson) => lesson.id === params.lessonId);

  if (!lesson) {
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
