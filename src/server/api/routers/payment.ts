import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
// todo: helt unødvendig til stripe implementasjonen, bare et eksempel på TRPC router

export const paymentRouter = createTRPCRouter({
  getFulfilledPayment: protectedProcedure.query(async ({ ctx }) => {
    const fulfilledPayment = await ctx.db.payment.findFirst({
      where: { userId: ctx.session.user.id, fulfilled: true },
    });

    if (!fulfilledPayment) return false;
    return fulfilledPayment.fulfilled;
  }),
});
