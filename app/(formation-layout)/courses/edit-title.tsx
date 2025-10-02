"use client";

import { cn } from "@/lib/utils";
import { useState, useRef, useOptimistic, useTransition } from "react";
import { Check, Edit } from "lucide-react";
import { title } from "process";

export const UpdateTitleForm = (props: {
  reviewId: string;
  children: string;
  setTitle?: (reviewId: string, newTitle: string) => void;
  className?: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useOptimistic(
    props.children,
    (_, newtTitle: string) => newtTitle
  );

  const submit = () => {
    setIsEditing(false);
    const newTitle = ref.current?.value ?? "";
    props.setTitle?.(props.reviewId, newTitle);
    startTransition(() => {
      setTitle(newTitle);
    });
  };

  if (isEditing) {
    return (
      <div className="group flex items-center gap-2">
        <input
          ref={ref}
          className={cn(props.className)}
          defaultValue={props.children}
          style={{ fieldSizing: "content" }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submit();
            }
          }}
        ></input>
        <button
          className="group-hover:opacity-100 opacity-0 p-1 bg-accent"
          onClick={() => {
            submit();
          }}
        >
          <Check size={16} />
        </button>
      </div>
    );
  }
  return (
    <div className="group flex items-center gap-2">
      <p className={cn(props.className, { "animate-pulse": isPending })}>
        {title}
      </p>
      <button
        className="group-hover:opacity-100 opacity-0 p-1 bg-accent"
        onClick={() => {
          setIsEditing(true);
          setTimeout(() => ref.current?.focus(), 1);
        }}
      >
        <Edit size={16} />
      </button>
    </div>
  );
};
