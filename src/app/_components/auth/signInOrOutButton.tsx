"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { signIn, signOut } from "next-auth/react";

export default function SignInOrOutButton({ session }: { session: boolean }) {
  return (
    <Button
      variant="outline"
      onClick={() => {
        if (!session)
          void signIn("google", { callbackUrl: window.location.pathname });
        if (session) void signOut({ callbackUrl: window.location.pathname });
      }}
    >
      {session ? "Logg ut" : "Logg inn"}
    </Button>
  );
}
