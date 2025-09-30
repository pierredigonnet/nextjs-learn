-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "reveiw" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
