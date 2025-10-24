import { PageLayout } from "@/components/layout";
import { getUser } from "@/lib/auth-server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { unauthorized } from "next/navigation";
import { Check, X, Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
                  <Button>Upgrade Now</Button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
