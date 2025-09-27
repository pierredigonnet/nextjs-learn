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
import { Skeleton } from "@/components/ui/skeleton";

// Server component
export default async function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>404</CardTitle>
        <CardDescription>Video not found...</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/formations`} className="text-indigo-500 text-sm">
          {" "}
          Back to formations
        </Link>
      </CardFooter>
    </Card>
  );
}
