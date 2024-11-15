"use client";

import { convertToSubCurrency } from "@/lib/converterStrip";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "../app/_components/CheckoutPage";
import InfoPaymentCard from "./InfoPaymentCard";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined)
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY");

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function RequestPayment() {
  const amount = 7331;

  return (
    <>
      {/* unnecessary for Stripe implementation, just to show customer what they are paying for */}
      <InfoPaymentCard amount={amount} />
      <Elements
        stripe={stripePromise} // Stripe promise from loadStripe - creates a payment intent - aka id
        options={{
          mode: "payment",
          amount: convertToSubCurrency(amount), // currency value should be given in subunits
          currency: "nok",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </>
  );
}
