"use client";

import useHidden from "@/hooks/useHidden";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";

export default function Aside() {
  const segment = useSelectedLayoutSegment();
  const search = useSearchParams();
  const { push, refresh } = useRouter();

  const hidden = useHidden();

  const isOpen = (search.get("menu") as "1" | "0" | undefined) ?? "0";

  const handleClose = () => {
    push(`${segment}?menu=0`);
  };

  const menuItems = [
    { label: "Overview", href: "dashboard", icon: "/svg/dashboard" },
    { label: "BIST", href: "bist", icon: "/svg/bist" },
    { label: "Currency", href: "currency", icon: "/svg/currency" },
    {
      label: "Manage Portfolio",
      href: "manage-portfolio",
      icon: "/svg/manage-portfolio",
    },
  ];

  async function signOut() {
    const {} = await supabase.auth.signOut();
    refresh();
  }

  return (
    hidden && (
      <aside
        className={`${
          isOpen == "1" ? "max-xl:translate-x-0" : "max-xl:-translate-x-full"
        } fixed z-50 flex h-full w-64 shrink-0 flex-col border-black/25 bg-dark-1 pl-8 pt-16 transition max-xl:border-r xl:relative`}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height={24}
          width={24}
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute right-8 top-8 cursor-pointer xl:hidden`}
          onClick={handleClose}
        >
          <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
        </svg>

        <div className="inline-flex grow flex-col items-start justify-start gap-8">
          {menuItems.map((e, index) => (
            <Link
              key={index}
              href={`/${e.href}`}
              className={`${
                segment == e.href ? "bg-primary" : ""
              } flex w-[166px] items-center gap-5 rounded-lg px-4 py-2`}
            >
              <Image
                src={`${e.icon}${segment == e.href ? "-white" : ""}.svg`}
                width={24}
                height={24}
                alt="logo"
                className={`text-red-500`}
              />
              <div
                className={`${
                  segment == e.href ? "text-white" : "text-disabled"
                } text-sm font-semibold`}
              >
                {e.label}
              </div>
            </Link>
          ))}
        </div>

        <div className={`flex flex-col gap-8 pb-16`}>
          <button
            className="flex w-[166px] items-center gap-5 rounded-lg px-4 py-2"
            onClick={signOut}
          >
            <Image
              src={`/svg/logout.svg`}
              width={24}
              height={24}
              alt="logo"
              className={`text-red-500`}
            />
            <div className="text-sm text-gray-400">Logout</div>
          </button>
        </div>
      </aside>
    )
  );
}
