"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Triangle, TriangleAlert } from "lucide-react";

export default function Error() {
  return (
    <Alert>
      <TriangleAlert size={16} />
      <AlertTitle>
        Unexpected error occured and displayed in video section
      </AlertTitle>
    </Alert>
  );
}
