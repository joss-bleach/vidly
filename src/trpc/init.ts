import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { auth } from "@clerk/nextjs/server";

import { ratelimit } from "@/lib/ratelimit";

import { getUserByClerkId } from "@/db/queries/user";

export const createTRPCContext = cache(async () => {
  const { userId } = await auth();
  return { clerkUserId: userId };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async function isAuth(opts) {
  const { ctx } = opts;

  if (!ctx.clerkUserId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const [data] = await getUserByClerkId({ clerkId: ctx.clerkUserId });
  if (!data) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const { success } = await ratelimit.limit(data.id);
  if (!success) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  }

  return opts.next({
    ctx: {
      ...ctx,
      user: data,
    },
  });
});
