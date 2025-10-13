import { PageLayout } from "@/components/layout";
import { ModeToggle } from "@/components/theme-toggle";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { SelectStar } from "@app/(formation-layout)/courses/select-star";
import { UpdateTitleForm } from "@app/(formation-layout)/courses/edit-title";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { Trash } from "lucide-react";
import { ReviewForm } from "./review-form";

export default async function Home() {
  const reviews = await prisma.review.findMany();

  const changeStar = async (reviewId: string, star: number) => {
    "use server";

    await new Promise((r) => setTimeout(r, 2000));

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: { star: star },
    });
    revalidatePath("/");
  };

  const changeName = async (reviewId: string, name: string) => {
    "use server";

    await new Promise((r) => setTimeout(r, 2000));

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: { name: name },
    });
    revalidatePath("/");
  };

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
      <Card className="px-4">
        <ReviewForm />
      </Card>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="relative">
            <div className="absolute right-4 top-4">
              <form>
                <Button
                  formAction={async () => {
                    "use server";

                    await prisma.review.delete({ where: { id: review.id } });
                    revalidatePath("/");
                  }}
                  className="cursor-pointer"
                  size="sm"
                  variant="outline"
                >
                  <Trash />
                </Button>
              </form>
            </div>
            <CardHeader>
              <div className="flex items-center gap-1 mb-1">
                <SelectStar
                  star={review.star}
                  reviewId={review.id}
                  onStarChange={changeStar}
                />
              </div>
              <UpdateTitleForm
                onTitleChange={changeName}
                className="text-lg font-bold"
                reviewId={review.id}
              >
                {review.name}
              </UpdateTitleForm>
            </CardHeader>
            <CardContent>{review.review}</CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}
