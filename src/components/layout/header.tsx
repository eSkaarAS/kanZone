import SkatteetatenLogo from "@/app/_components/SkatteetatenLogo";
import { ThemeToggle } from "@/contexts/themeContext/theme-toggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-background bg-gradient-to-t">
      <div className="sticky top-0 z-50 mx-[auto] flex h-16 w-full max-w-[1480px] items-center justify-center px-12">
        <div className="ml-0 mr-auto flex h-12 items-center">
          <Link href="/">
            <SkatteetatenLogo />
          </Link>
        </div>
        <div className="mr-0 flex gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
