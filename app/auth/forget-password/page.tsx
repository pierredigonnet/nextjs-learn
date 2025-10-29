"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardDescription } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

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
          Enter your email address and we&apos;ll send you a link to reset your
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
