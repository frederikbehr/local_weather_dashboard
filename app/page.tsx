import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.betterdevelopers.dk"
          target="_blank"
        >
          <Image
            aria-hidden
            src="/bd-logo.webp"
            alt="www.betterdevelopers.dk"
            width={24}
            height={24}
          />
          www.betterdevelopers.dk
        </a>
        
      </main>
    </div>
  );
}
