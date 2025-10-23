-- CreateEnum
CREATE TYPE "public"."UserPlan" AS ENUM ('FREE', 'PRO');

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "plan" "public"."UserPlan" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "stripeCustomerId" TEXT;
