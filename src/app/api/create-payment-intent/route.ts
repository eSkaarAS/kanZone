// TODO: remove eslint-disable... in future
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeClient = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const session = await getServerAuthSession();
    const userId = session?.user.id;
    if (!userId) throw new Error("User not found");

    const { amount } = await req.json();

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: "nok",
      automatic_payment_methods: { enabled: true },
    });

    if (!paymentIntent.id) throw new Error("Payment intent not found");

    await db.payment.create({
      data: {
        userId,
        paymentIntent: paymentIntent.id,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("internal error", error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
