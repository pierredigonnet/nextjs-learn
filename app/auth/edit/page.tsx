import { AccountForm } from "./account-form";
import { getUser } from "@/lib/auth-server";
import { redirect, unauthorized } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function EditPage() {
  const user = await getUser();

  if (!user) {
    unauthorized();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit User</CardTitle>
      </CardHeader>
      <CardContent>
        <AccountForm defaultValues={{ name: user.name, image: user.image }} />
      </CardContent>
    </Card>
  );
}
