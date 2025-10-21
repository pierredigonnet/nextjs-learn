"use server";

import { prisma } from "@/lib/prisma";
import { actionClient, actionUser, SafeError } from "@/lib/safe-action-client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ReviewFormSchema } from "./review.schema";

export const addReviewSafeAction = actionClient
  .schema(ReviewFormSchema.extend({ userId: z.string() }))
  .action(async ({ parsedInput: input }) => {
    if (input.name === "Méchant") {
      throw new SafeError("Invalid Name");
    }

    const newReview = await prisma.review.create({
      data: {
        name: input.name,
        review: input.review,
        star: 5,
        userId: input.userId,
      },
    });

    revalidatePath("/");
    return newReview;
  });

export const updateReviewAction = actionUser
  .schema(
    z.object({
      star: z.number().optional(),
      name: z.string().optional(),
      reviewId: z.string(),
    })
  )
  .action(async ({ parsedInput: input, ctx }) => {
    await prisma.review.update({
      where: {
        id: input.reviewId,
        userId: ctx.user.id,
      },
      data: {
        star: input.star,
        name: input.name,
      },
    });
  });

export const deleteReviewAction = actionUser
  .schema(
    z.object({
      reviewId: z.string(),
    })
  )
  .action(async ({ parsedInput: input, ctx }) => {
    await prisma.review.delete({
      where: {
        id: input.reviewId,
        userId: ctx.user.id,
      },
    });
  });
