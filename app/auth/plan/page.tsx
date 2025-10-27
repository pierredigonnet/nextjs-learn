import { PageLayout } from "@/components/layout";
import { getUser } from "@/lib/auth-server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect, unauthorized } from "next/navigation";
import { Check, X, Edit } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "./submit-button";
import { stripe } from "@/lib/stripe";
import { getServerUrl } from "@/lib/server-url";
import { UserPlan } from "@/generated/prisma";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  const plan = user.plan;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold">Current Plan : {user.plan}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Free Plan</CardTitle>
            <CardDescription>
              Basic features for getting started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="text-3xl font-bold">$0</div>
              <div className="text-muted-foreground">Up to 3 reviews</div>
              {plan === "FREE" ? (
                <div className="text-sm text-muted-foreground">
                  Current Plan
                </div>
              ) : (
                <form>
                  <button className="w-full" disabled>
                    Current Plan Available
                  </button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Premium Plan</CardTitle>
            <CardDescription>Advanced features for power users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="text-3xl font-bold">$99</div>
              <div className="text-muted-foreground">Unlimited reviews</div>
              {plan === "PRO" ? (
                <div className="text-sm text-muted-foreground">
                  Current Plan
                </div>
              ) : (
                <form>
                  <SubmitButton
                    formAction={async () => {
                      "use server";
                      const stripeCheckout =
                        await stripe.checkout.sessions.create({
                          mode: "payment",
                          payment_method_types: ["card"],
                          line_items: [
                            {
                              price: process.env.STRIPE_PRO_PRICE_ID,
                              quantity: 1,
                            },
                          ],
                          metadata: {
                            plan: UserPlan.PRO,
                          },
                          success_url: `${getServerUrl()}/auth/plan?success=true`,
                          cancel_url: `${getServerUrl()}/auth/plan?canceled=true`,
                          customer: user.stripeCustomerId,
                        });

                      if (!stripeCheckout.url) {
                        throw new Error("Oh, not possible");
                      }

                      redirect(stripeCheckout.url);
                    }}
                  >
                    Upgrade Now
                  </SubmitButton>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
