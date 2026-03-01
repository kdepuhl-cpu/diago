"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-off-white dark:bg-gray-900 flex flex-col">
      <div className="py-6 flex justify-center">
        <Link href="/">
          <Image
            src="/icons/fussball-woche.svg"
            alt="Fußball-Woche"
            width={200}
            height={34}
            className="h-8 w-auto dark:hidden"
          />
          <Image
            src="/icons/fussball-woche_white.svg"
            alt="Fußball-Woche"
            width={200}
            height={34}
            className="h-8 w-auto hidden dark:block"
          />
        </Link>
      </div>
      <div className="flex-1 flex items-start justify-center px-4 pt-4 pb-12">
        {children}
      </div>
    </div>
  );
}
