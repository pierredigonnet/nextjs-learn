import type { PropsWithChildren } from "react";

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto min-h-full border-x p-4">
      {children}
    </div>
  );
}
