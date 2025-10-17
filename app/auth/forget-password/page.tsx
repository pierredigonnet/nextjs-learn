"use client";

import { PageLayout } from "@/components/layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardDescription } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignupPage() {
  async function onSubmit(formData: FormData) {
    const email = formData.get("email");
    await authClient.forgetPassword(
      {
        email: email as string,
        redirectTo: "/resetPassword",
      },
      {
        onSuccess: () => {
          router.push("/auth");
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" placeholder="email" />
          </div>
          <Button type="submit" className="mt-4 w-full">
            Reset Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
