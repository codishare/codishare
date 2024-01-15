import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});

export const { createCallerFactory, router } = t;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
