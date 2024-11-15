import SkatteetatenFooterLogo from "@/app/_components/SkatteetatenFooterLogo";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-center gap-8 text-white">
      <div className="relative flex w-full items-center justify-center rounded-b-2xl shadow-lg">
        <div
          className="absolute inset-0 h-full rounded-b-2xl"
          style={{
            backgroundColor: "#F3A7B0",
            clipPath: "polygon(0 28%, 100% 35%, 100% 100%, 0 100%)",
          }}
        />
        <div
          className="absolute inset-0 h-full"
          style={{
            backgroundColor: "#6f2c3f",
            clipPath: "polygon(0 35%, 100% 27%, 100% 100%, 0 100%)",
          }}
        />
        <div className="z-50 mt-32 flex w-full items-center justify-center bg-[#6f2c3f] pb-10">
          <SkatteetatenFooterLogo />
        </div>
      </div>
    </footer>
  );
}
