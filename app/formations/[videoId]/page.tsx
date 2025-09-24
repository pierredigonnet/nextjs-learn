import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { PageLayout } from "@/components/layout";
import { VIDEOS } from "../data";

// Server component
export default async function Page(props: {
  params: Promise<{ videoId: string }>;
}) {
  const params = await props.params;
  const video = VIDEOS.find((video) => video.id === params.videoId);
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
                href={`/formations/${video.id}/lessons/${lesson.id}`}
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
