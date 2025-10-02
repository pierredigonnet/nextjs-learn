import { PageLayout } from "@/components/layout";
import { ModeToggle } from "@/components/theme-toggle";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { SelectStar } from "./(formation-layout)/courses/select-star";
import { UpdateTitleForm } from "./(formation-layout)/courses/edit-title";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { Trash } from "lucide-react";

export default async function Home() {
  const reviews = await prisma.review.findMany();

  const changeStar = async (reviewId: string, star: number) => {
    "use server";
    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: { star: star },
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
        <form
          action={async (formData) => {
            // ‼️‼️‼️‼️‼️
            "use server";
            const name = formData.get("name") as string;
            const review = formData.get("review") as string;

            console.log({ name, review });

            await prisma.review.create({
              data: {
                name,
                review,
                star: 5,
              },
            });
            revalidatePath("/");
          }}
          className="flex flex-col gap-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input type="texte" name="name" id="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="review">Review</Label>
            <Textarea name="review" id="review" />
          </div>
          <Button type="submit" className="cursor-pointer">
            submit
          </Button>
        </form>
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
