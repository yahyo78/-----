import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import ReduxProvider from "@/api/store/providerRedux/reduxProvider";

import { ArrowLeftRight, Menu, Wallet } from "lucide-react";
import imageLogo from "@/public/Link.svg";
import Image from "next/image";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import Footer from "@/components/footer";

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

// ----------------------
//       METADATA
// ----------------------

export const metadata: Metadata = {
  title: "Esxata Bank - Converter",
  icons: {
    icon: "/sdf2.png",
  },
};

// ----------------------
//        LAYOUT
// ----------------------

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <ReduxProvider>
          <header className="app-header">
            <nav className="px-[5%] flex justify-between text-[#0050c8] items-center py-5">
              {/* LOGO */}
              <Link href={"/"}>
                <Image src={imageLogo} alt="Logo" width={140} height={40} />
              </Link>

              {/* DESKTOP NAVIGATION */}
              <div className="hidden xl:flex gap-[30px] text-lg font-medium">
                <Link className="flex gap-[10px] items-center" href="/finance">
                  <Wallet /> Транзакции
                </Link>

                <Link className="flex gap-[10px] items-center" href="/home">
                  <ArrowLeftRight /> Конвертер
                </Link>
              </div>

              {/* MOBILE MENU */}
              <Popover>
                <PopoverTrigger className="xl:hidden">
                  <Menu className="text-[#0050c8]" />
                </PopoverTrigger>

                <PopoverContent
                  className="
                    z-[9999] relative w-[220px] bg-white 
                    p-[20px] rounded-[12px] shadow-md mx-[10px]
                    transition-all duration-200 origin-top-right
                    data-[state=open]:opacity-100 data-[state=open]:scale-100
                    data-[state=closed]:opacity-0 data-[state=closed]:scale-95
                  "
                >
                  <div className="flex flex-col gap-[18px] text-lg font-medium">
                    <Link className="flex gap-[12px] items-center" href="/home">
                      <ArrowLeftRight /> Конвертер
                    </Link>

                    <Link
                      className="flex gap-[12px] items-center"
                      href="/finance"
                    >
                      <Wallet /> Транзакции
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </nav>
          </header>

          {/* PAGE CONTENT */}
          {children}

          {/* FOOTER */}
          <Footer />
        </ReduxProvider>

        <Analytics />
      </body>
    </html>
  );
}
