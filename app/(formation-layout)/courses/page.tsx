import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { VIDEOS } from "./data";
import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";
import { SelectStar } from "./select-star";
import { revalidatePath } from "next/cache";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { UpdateTitleForm } from "./edit-title";

export default async function Page() {
  const reviews = await prisma.review.findMany();

  // server function
  const setReviewStar = async (reviewId: string, star: number) => {
    "use server";

    await prisma.review.update({
      where: { id: reviewId },
      data: {
        star,
      },
    });

    revalidatePath("/courses");
  };

  // server function
  const setReviewName = async (reviewId: string, name: string) => {
    "use server";

    await prisma.review.update({
      where: { id: reviewId },
      data: {
        name,
      },
    });

    revalidatePath("/courses");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan de Cours</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="list-disc list-inside">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center gap-1 mb-1">
                  <SelectStar
                    star={review.star}
                    reviewId={review.id}
                    setNewStar={setReviewStar}
                  />
                </div>
                <UpdateTitleForm
                  className="text-lg font-bold"
                  setTitle={setReviewName}
                  reviewId={review.id}
                >
                  {review.name}
                </UpdateTitleForm>
              </CardHeader>
              <CardContent>{review.review}</CardContent>
            </Card>
          ))}
        </ul>
        <Card>
          <CardContent>
            <Suspense fallback={<Skeleton className="w-full h-10" />}>
              <LongLoadingComponent />
            </Suspense>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

const LongLoadingComponent = async () => {
  const reviews = prisma.review.count();
  await new Promise((r) => setTimeout(r, 4000));
  return <p>{reviews}</p>;
};
