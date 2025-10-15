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

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Name</span>
            <span>{user?.name}</span>
          </div>
          <div className="grid gap-2">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Email</span>
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
