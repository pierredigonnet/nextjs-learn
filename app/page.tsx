import { PageLayout } from "@/components/layout";
import { ModeToggle } from "@/components/theme-toggle";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { SelectStar } from "./(formation-layout)/courses/select-star";
import { UpdateTitleForm } from "./(formation-layout)/courses/edit-title";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { Trash } from "lucide-react";
import { ReviewForm } from "./reviews/review-form";

export default async function Home() {
  return (
    <PageLayout>
      <div className="flex gap-3 items-center mb-4">
        <div className="h-fit">Learn Next</div>
        <Link href="/formations" className="text-indigo-500 underline">
          Fondamentals
        </Link>
        <Link href="/courses" className="text-indigo-500 underline">
          Courses
        </Link>
        <ModeToggle />
      </div>
    </PageLayout>
  );
}
