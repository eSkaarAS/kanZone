/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { env } from "@/env";
import { db } from "@/server/db";
import { type NextRequest, NextResponse } from "next/server";
import stripe from "stripe";

const stripeClient = new stripe(env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("stripe-signature");
    const body = req.body;

    if (!body)
      return NextResponse.json({ error: "No stripe event" }, { status: 400 });

    const rawData = await streamToString(body);

    if (!signature)
      return NextResponse.json(
        { error: "No stripe signature" },
        { status: 400 },
      );

    // CHECK THAT THE SIGNATURE IS VALID FROM STRIPE!
    // It will throw an error if it is not valid
    stripeClient.webhooks.constructEvent(
      rawData,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );

    const paymentIntent = JSON.parse(rawData).data.object.id as string;

    const paymentIntentRecord = await db.payment.update({
      where: { paymentIntent: paymentIntent },
      data: { fulfilled: true },
    });

    await db.payment.deleteMany({
      where: { userId: paymentIntentRecord.userId, fulfilled: false },
    });

    return NextResponse.json({ paymentIntentRecord });
  } catch (error) {
    console.error("Error processing event:", error);
    return NextResponse.json(
      { error: "Error processing event" },
      { status: 500 },
    );
  }
}

async function streamToString(stream: ReadableStream<Uint8Array>) {
  const chunks = [];
  const reader = stream.pipeThrough(new TextDecoderStream()).getReader();

  let done, value;
  while (!done) {
    ({ done, value } = await reader.read());
    if (value) {
      chunks.push(value);
    }
  }
  return chunks.join("");
}
