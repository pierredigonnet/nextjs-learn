import type { PropsWithChildren } from "react";
import { PageLayout } from "@/components/layout";
import Link from "next/link";

export default function layout(props: PropsWithChildren) {
  return (
    <PageLayout>
      <header className="border-b -mx-4 px-4 pb-2">
        <h3 className="font-bold">
          <Link href="/formations">Formation</Link>
        </h3>
      </header>
      {props.children}
    </PageLayout>
  );
}
