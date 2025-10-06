"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AddReviewAction, addReviewSafeAction } from "./review.action";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ComponentProps } from "react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export const ReviewForm = () => {
  const { executeAsync, hasErrored, result, hasSucceeded } =
    useAction(addReviewSafeAction);

  return (
    <form
      action={async (formData) => {
        const name = formData.get("name") as string;
        const review = formData.get("review") as string;
        await executeAsync({ name, review });
        toast.success("review created !");
      }}
      className="flex flex-col gap-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input type="text" name="name" id="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="review">Review</Label>
        <Textarea name="review" id="review" />
      </div>
      <SubmitButton type="submit" className="cursor-pointer">
        submit
      </SubmitButton>
      {hasErrored ? <p className="text-red-500">{result.serverError}</p> : null}
      {hasSucceeded ? (
        <p className="text-green-500">
          Review created with id : {result.data?.id}
        </p>
      ) : null}
    </form>
  );
};

const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();
  return <Button {...props} disabled={props.disabled || pending} />;
};
