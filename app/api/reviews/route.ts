import { NextResponse, type NextRequest } from "next/server";
import { Prisma } from "@/generated/prisma";
import z from "zod";
import { route } from "@/lib/zod-route-client";
import { prisma } from "@/lib/prisma";
import { SafeError } from "@/lib/safe-action-client";

const schema = z.object({
  name: z.string(),
  review: z.string(),
});

export const GET = async () => {
  const reviews = await prisma.review.findMany();
  return NextResponse.json({ reviews });
};

export const POST = route.body(schema).handler(async (req, { body: input }) => {
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

  return { review: newReview };
});

/*

 export const POST = async (request: NextRequest) => {
  console.log(request.nextUrl);

  const body = await request.json();
  const input = schema.parse(body);

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

  return NextResponse.json({ review: newReview });
}; 

*/
