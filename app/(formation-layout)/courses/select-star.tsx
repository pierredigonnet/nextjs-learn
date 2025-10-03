"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState, useTransition } from "react";

export const SelectStar = (props: {
  star: number;
  reviewId: string;
  onStarChange?: (reviewId: string, star: number) => Promise<void>;
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn("flex items-center gap-1", {
        "animate-pulse": isPending,
      })}
      onMouseLeave={() => {
        setHoverIndex(null);
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < props.star;
        const isNewFilled = hoverIndex ? i - 1 < hoverIndex : null;
        return (
          <button
            onMouseEnter={() => {
              setHoverIndex(i);
            }}
            key={i}
            onClick={() => {
              startTransition(() => {
                props.onStarChange?.(props.reviewId, i + 1);
              });
            }}
          >
            <Star
              size={16}
              className={cn("text-yellow-400 transition cursor-pointer", {
                "fill-yellow-400": isFilled,
                "-translate-y-0.5 fill-orange-500 text-orange-500": isNewFilled,
              })}
            />
          </button>
        );
      })}
    </div>
  );
};
