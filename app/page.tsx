import { PageLayout } from "@/components/layout";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout>
      <div className="h-fit">Learn Next</div>
      <Link href="/formations" className="text-indigo-500 underline">
        Fondamentals
      </Link>
      <Link href="/courses" className="text-indigo-500 underline">
        Courses
      </Link>
      <ModeToggle />
    </PageLayout>
  );
}
