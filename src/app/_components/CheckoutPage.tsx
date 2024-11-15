"use client";

import { Button } from "@/components/ui/button";
import { convertToSubCurrency } from "@/lib/converterStrip";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function CheckoutPage({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setClientSecret(data.clientSecret);
      });
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message ?? "An unknown error occurred");
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: window.location.origin + "/payment-success",
      },
    });

    if (confirmError) {
      setErrorMessage(confirmError.message ?? "An unknown error occurred");
      setLoading(false);
      return;
    } else {
      // The payment UI automaticcaly closes with a success animation
      // Your customer will be redirected back to your "return_url"
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125rem] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            loading...
          </span>
        </div>
      </div>
    );
  }

  console.log(errorMessage);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 rounded-lg bg-white p-4"
    >
      <p className="w-80 text-wrap break-words">PAYMENT INTENT</p>
      <p className="w-80 text-wrap break-words">{clientSecret}</p>
      <PaymentElement />

      <Button
        disabled={!stripe || loading}
        type="submit"
        variant="secondary"
        className="w-full bg-black text-white"
      >
        Betal
      </Button>
    </form>
  );
}
