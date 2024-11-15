import { getServerAuthSession } from "@/server/auth";
import React from "react";
import SignInButton from "./signinButton";

export default async function IsServerAuthed({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <SignInButton />
      </div>
    );

  return <>{children}</>;
}
