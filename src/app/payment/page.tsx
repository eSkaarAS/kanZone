import RequestPayment from "@/components/RequestPayment";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined)
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY");

export default async function Home() {
  return (
    <main
      className="flex min-h-[75vh] flex-col items-center justify-center gap-8 bg-background text-foreground"
      suppressHydrationWarning
    >
      <RequestPayment />
    </main>
  );
}
