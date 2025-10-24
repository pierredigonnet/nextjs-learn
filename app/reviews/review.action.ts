"use server";

import { prisma } from "@/lib/prisma";
import { actionClient, actionUser, SafeError } from "@/lib/safe-action-client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ReviewFormSchema } from "./review.schema";
import { LIMITATIONS } from "@/lib/auth-plan";
import type { UserPlan } from "@/generated/prisma";

export const addReviewSafeAction = actionClient
  .schema(ReviewFormSchema.extend({ userId: z.string() }))
  .action(async ({ parsedInput: input }) => {
    if (input.name === "Méchant") {
      throw new SafeError("Invalid Name");
    }

    const userPlan = await prisma.user.findUnique({
      where: { id: input.userId },
      select: { plan: true },
    });

    if (!userPlan) {
      throw new SafeError("No user find");
    }

    const limit = LIMITATIONS[userPlan?.plan as UserPlan];

    const currentReviewCount = await prisma.review.count({
      where: { userId: input.userId },
    });

    if (currentReviewCount >= limit.reviewLimit) {
      throw new SafeError(
        "Impossible to add more review. Ask owner to increase limitations"
      );
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
