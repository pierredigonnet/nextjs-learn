/*
  Warnings:

  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Review" ADD COLUMN "userId" TEXT;

-- Update reviews with first user id or delete all reviews if no users exist
DO $$
DECLARE
    first_user_id TEXT;
BEGIN
    SELECT id INTO first_user_id FROM "public"."user" LIMIT 1;
    
    IF first_user_id IS NULL THEN
        DELETE FROM "public"."Review";
    ELSE
        UPDATE "public"."Review" SET "userId" = first_user_id;
    END IF;
END $$;

-- Make userId NOT NULL after setting values
ALTER TABLE "public"."Review" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

