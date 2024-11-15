import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { paymentRouter } from "./routers/payment";

export const appRouter = createTRPCRouter({
  payment: paymentRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
