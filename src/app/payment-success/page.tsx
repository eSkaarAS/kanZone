"use client";

import SuccessfulPaymentCard from "@/components/SuccessfulPaymentCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { payment_intent: string; redirect_status: string };
}) {
  const { redirect_status, payment_intent } = searchParams;
  const [countdown, setCountdown] = useState(3);

  const setCountdownValue = (value: number) => {
    setCountdown(value >= 1 ? value - 1 : 0);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (redirect_status === "succeeded") {
      intervalId = setInterval(() => {
        console.log(countdown);
        setCountdownValue(countdown);
        if (countdown === 0) window.location.href = "/";
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [countdown, redirect_status]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background text-foreground"
      suppressHydrationWarning
    >
      <p>Redirect in {countdown}...</p>
      <SuccessfulPaymentCard
        payment_intent={payment_intent}
        redirect_status={redirect_status}
      />
      <Link
        href="/"
        className={cn(buttonVariants(), "bg-blue-200 text-blue-600")}
      >
        Go to home page
      </Link>
    </main>
  );
}
