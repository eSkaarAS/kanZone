"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <Button
      className="border-green-300 bg-green-300 p-8 text-3xl"
      variant="outline"
      onClick={() =>
        void signIn("google", { callbackUrl: window.location.pathname })
      }
    >
      Logg inn
    </Button>
  );
}
