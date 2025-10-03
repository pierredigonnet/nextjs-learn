"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createReview = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const review = formData.get("review") as string;

  await new Promise((r) => setTimeout(r, 2000));

  console.log({ name, review });

  await prisma.review.create({
    data: {
      name,
      review,
      star: 5,
    },
  });
  revalidatePath("/");
};
