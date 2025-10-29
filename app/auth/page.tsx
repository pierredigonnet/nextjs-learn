import { getUser } from "@/lib/auth-server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { unauthorized } from "next/navigation";
import { Check, X, Edit } from "lucide-react";
import Link from "next/link";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-0">
        <CardTitle>User Profile</CardTitle>
        <div className="flex-1"></div>
        <Link href="/auth/edit" className="flex items-center gap-2 text-sm">
          <Edit className="size-3 text-muted-foreground" />
          Edit
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Name</span>
            <span>{user?.name}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Email</span>

              {user.emailVerified ? (
                <Check className="size-3" />
              ) : (
                <X className="size-3" />
              )}
            </div>
            <span>{user?.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
