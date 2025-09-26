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
import { Skeleton } from "@/components/ui/skeleton";

// Server component
export default async function Loading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-full h-10">Video</Skeleton>
        <Skeleton className="w-full h-8"></Skeleton>
      </CardHeader>
      <CardFooter>
        <Skeleton className="w-16 h-8"></Skeleton>
      </CardFooter>
    </Card>
  );
}
