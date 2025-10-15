import { PageLayout } from "@/components/layout";
import type { PropsWithChildren } from "react";

export default function Layout(props: { children: PropsWithChildren }) {
  return <PageLayout>{props.children}</PageLayout>;
}
