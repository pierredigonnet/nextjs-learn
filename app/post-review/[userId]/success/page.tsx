import { PageLayout } from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReviewForm } from "@app/reviews/review-form";
import { notFound } from "next/navigation";

export default async function RoutePage(props: {
  params: Promise<{ userId: string }>;
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: (await props.params).userId,
    },
  });

  if (!user) notFound();

  return (
    <PageLayout>
      <Button variant="outline" size="sm">
        <Avatar className="size-6">
          {user.image ? <AvatarImage src={user.image} /> : null}
          <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <p>{user.name}</p>
      </Button>
      <Card className="px-4">
        <h1>Thanks you for your review</h1>
      </Card>
    </PageLayout>
  );
}
