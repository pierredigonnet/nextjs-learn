"use server";

import { prisma } from "@/lib/prisma";
import { actionClient, SafeError } from "@/lib/safe-action-client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ReviewFormSchema } from "./review.schema";

export const addReviewSafeAction = actionClient
  .schema(ReviewFormSchema)
  .action(async ({ parsedInput: input }) => {
    await new Promise((r) => setTimeout(r, 2000));

    if (input.name === "Méchant") {
      throw new SafeError("Invalid Name");
    }

    const newReview = await prisma.review.create({
      data: {
        name: input.name,
        review: input.review,
        star: 5,
      },
    });

    revalidatePath("/");
    return newReview;
  });
