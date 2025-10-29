"use client";

import { ComponentProps } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReviewFormSchema } from "./review.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { addReviewSafeAction } from "./review.action";
import { useAction } from "next-safe-action/hooks";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export const ReviewForm = (props: { userId: string; redirectUrl?: string }) => {
  // Define form with validation and empty defaults
  const form = useForm<z.infer<typeof ReviewFormSchema>>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      name: "",
      review: "",
    },
  });

  const router = useRouter();

  // Execute the safe action to add a review
  const { execute, isPending } = useAction(addReviewSafeAction, {
    onError: (error) => {
      toast.error(error.error.serverError ?? "Impossible to add more review !");
    },
    onSuccess: () => {
      props.redirectUrl ? router.push(props.redirectUrl) : router.refresh();
      form.reset();
    },
  });

  // Submit form values along with userId to execute the review creation
  async function onSubmit(values: z.infer<typeof ReviewFormSchema>) {
    await execute({ ...values, userId: props.userId });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>The public name for the review</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Textarea placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Be honest</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
