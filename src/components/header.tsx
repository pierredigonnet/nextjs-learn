import { getUser } from "@/lib/auth-server";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Suspense } from "react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { User2 } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex items-center gap-4 px-4 py-2 border-b max-w-md mx-auto border-x">
      <Link href="/">App</Link>
      <div className="flex-1"></div>
      <Suspense fallback={<Skeleton className="h-10 w-20" />}>
        <AuthButton />
      </Suspense>
    </header>
  );
};

export const AuthButton = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <Link
        href="/auth/signin"
        className={buttonVariants({ size: "sm", variant: "outline" })}
      >
        Signin
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Avatar className="size-6">
            {user.image ? <AvatarImage src={user.image} /> : null}
            <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <p>{user.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/auth" className="flex items-center gap-2 ">
            <User2 className="size-3" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form>
            <button
              className="flex items-center gap-2 w-full"
              formAction={async () => {
                "use server";

                await auth.api.signOut({
                  headers: await headers(),
                });

                redirect("/auth/signin");
              }}
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
