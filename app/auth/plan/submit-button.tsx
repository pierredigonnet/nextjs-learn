"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton({
  children,
  formAction,
}: {
  children: React.ReactNode;
  formAction: () => Promise<void>;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" formAction={formAction} disabled={pending}>
      {pending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
