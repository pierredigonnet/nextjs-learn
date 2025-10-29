import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";
import { stripe } from "./stripe";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const stripeCustomer = await stripe.customers.create({
            email: user.email,
            name: user.name,
          });

          const stripeCustomerId = stripeCustomer.id;

          if (!stripeCustomerId) {
            return;
          }

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              stripeCustomerId,
            },
          });
        },
      },
    },
  },
  user: {
    additionalFields: {
      plan: {
        type: "string",
        nullable: true,
      },
      stripeCustomerId: {
        type: "string",
        nullable: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
