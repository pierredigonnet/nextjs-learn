import { PageLayout } from "@/components/layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SignInForm } from "./signin-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
