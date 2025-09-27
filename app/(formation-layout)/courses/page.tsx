import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { VIDEOS } from "./data";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan de Cours</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>listes des cours en cours hehe...</p>
      </CardContent>
    </Card>
  );
}
