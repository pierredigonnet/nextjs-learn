import type { UserPlan } from "@/generated/prisma";

export const LIMITATIONS: Record<UserPlan, { reviewLimit: number }> = {
  FREE: {
    reviewLimit: 3,
  },
  PRO: {
    reviewLimit: 999,
  },
};
