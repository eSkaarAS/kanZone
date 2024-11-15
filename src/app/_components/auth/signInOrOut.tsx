import { getServerAuthSession } from "@/server/auth";
import SignInOrOutButton from "./signInOrOutButton";

export default async function SignInOrOut() {
  const session = await getServerAuthSession();
  return <SignInOrOutButton session={!!session} />;
}
