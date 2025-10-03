"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "./review.action";
import { useFormStatus } from "react-dom";

export const ReviewForm = () => {
  return (
    <form action={createReview} className="flex flex-col gap-4">
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
    </form>
  );
};

const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();
  return <Button {...props} disabled={props.disabled || pending} />;
};
