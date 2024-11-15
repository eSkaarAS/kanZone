import { Separator } from "@radix-ui/react-dropdown-menu";
import { Percent, User } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center gap-8 bg-background text-foreground"
      suppressHydrationWarning
    >
      <div className="relative flex min-h-screen w-full flex-col items-center">
        <div className="relative flex h-4 w-full items-center justify-center">
          <div
            className="absolute inset-0 h-full"
            style={{
              backgroundColor: "#F3A7B0",
              clipPath: "polygon(100% 80%, 0% 0%, 0% 0%, 100% 0%)",
            }}
          />
          <div
            className="absolute inset-0 h-full"
            style={{
              backgroundColor: "#6f2c3f",
              clipPath: "polygon(0% 0%, 0% 100%, 100% 0%, 0% 0%)",
            }}
          />
        </div>
        <SkattSection
          title="Min side"
          description="Se og endre opplysninger om deg selv, adressen, kontonummeret og skatten din. Du finner også innboksen din med faktura, melding og brev."
          icon={<User size={32} className="fill-black" />}
        />
        <Separator className="h-0.5 w-11/12 bg-black" />
        <SkattSection
          title="Skatt"
          description="Se og endre opplysninger om deg selv, adressen, kontonummeret og skatten din. Du finner også innboksen din med faktura, melding og brev."
          icon={
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black text-sm font-bold">
              KR
            </div>
          }
        />
        <Separator className="h-0.5 w-11/12 bg-black" />
        <SkattSection
          title="Avgifter"
          description="Bilavgifter, dokumentavgift og kjøp fra utlandet."
          icon={<Percent size={32} />}
        />
        <Separator className="h-0.5 w-11/12 bg-black" />
      </div>
    </main>
  );
}

function SkattSection({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Link href="/payment">
      <div className="my-4 flex w-full flex-col items-center gap-4 py-4">
        {icon}
        <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
        <p className="px-10 text-center">{description}</p>
      </div>
    </Link>
  );
}
