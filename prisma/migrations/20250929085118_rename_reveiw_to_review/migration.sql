/*
  Warnings:

  - You are about to drop the column `reveiw` on the `Review` table. All the data in the column will be lost.
  - Added the required column `review` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Review" DROP COLUMN "reveiw",
ADD COLUMN     "review" TEXT NOT NULL;
