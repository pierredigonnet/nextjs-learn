import { createSafeActionClient } from "next-safe-action";
import { getUser } from "./auth-server";

export class SafeError extends Error {
  constructor(error: string) {
    super(error);
  }
}

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof SafeError) {
      return error.message;
    }
    return "something went wrong";
  },
});

export const actionUser = actionClient.use(async ({ next }) => {
  const user = await getUser();
  if (!user) {
    throw new SafeError("Invalid User");
  }
  return next({ ctx: { user } });
});
