"use client";

import useHisseSenedi from "@/hooks/react-query/useHisseSenedi";
import useHidden from "@/hooks/useHidden";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

//search - normal.svg
export default function Header() {
  const segment = useSelectedLayoutSegment();
  const { push } = useRouter();
  const hidden = useHidden();
  const [search, setSearch] = useState<string>();
  const [focus, setFocus] = useState<boolean>(false);

  const { data } = useHisseSenedi();
  const pageData = data?.result;

  const menuItems = [
    { label: "Dashboard", href: "dashboard" },
    { label: "BIST", href: "bist" },
    { label: "Currency", href: "currency" },
    {
      label: "Manage Portfolio",
      href: "manage-portfolio",
    },
  ];

  const handleOpen = () => {
    push(`${segment}?menu=1`);
  };

  return (
    hidden && (
      <header className="relative mb-8 flex w-full flex-col gap-4 xl:flex-row xl:items-start xl:justify-center xl:px-8">
        <div className="left-0 flex items-center gap-2 text-2xl font-semibold text-white xl:absolute">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height={24}
            width={24}
            xmlns="http://www.w3.org/2000/svg"
            className={`cursor-pointer xl:hidden`}
            onClick={handleOpen}
          >
            <g id="Menu_Burger">
              <path d="M3.563,4.063c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.001c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.001Z"></path>
              <path d="M3.563,12.501c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.002c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.002Z"></path>
              <path d="M3.563,20.939c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.002c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.002Z"></path>
            </g>
          </svg>
          {menuItems.find((e) => e.href == segment)?.label}
        </div>
        <div className={`relative w-full max-w-96 rounded-lg bg-dark-1 px-4`}>
          <input
            placeholder="Search"
            className="flex h-11 w-full items-center bg-dark-1 focus:outline-none"
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value == "") {
                setFocus(false);
              } else {
                setFocus(true);
              }
            }}
          />
          <Image
            src={"/svg/search-normal.svg"}
            alt=""
            width={24}
            height={24}
            className={`absolute right-8 top-[10px]`}
          />
          {focus && (
            <div
              className={`absolute inset-x-0 top-full z-50 h-fit max-h-64 min-h-12 translate-y-2 overflow-y-auto rounded-lg border-2 border-dark-2 bg-dark-1 drop-shadow`}
            >
              {pageData &&
              pageData
                ?.filter(
                  (e) =>
                    e.code
                      .toLowerCase()
                      .includes(search?.toLowerCase() ?? "") ||
                    e.text.toLowerCase().includes(search?.toLowerCase() ?? ""),
                )
                ?.sort((a, b) => b.rate - a.rate)?.length > 0 ? (
                pageData
                  ?.filter(
                    (e) =>
                      e.code
                        .toLowerCase()
                        .includes(search?.toLowerCase() ?? "") ||
                      e.text
                        .toLowerCase()
                        .includes(search?.toLowerCase() ?? ""),
                  )
                  ?.sort((a, b) => b.rate - a.rate)
                  .map((item) => (
                    <Link
                      href={{
                        pathname: "/bist",
                        query: { code: item.code },
                      }}
                      key={item.code}
                      className="flex items-center gap-4 rounded-lg p-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFocus(false);
                      }}
                    >
                      <Image
                        src={`/533/${item.code}.svg`}
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 flex-shrink-0 rounded-lg bg-[#31353f] object-cover"
                      />

                      <div className="flex flex-col">
                        <span className="text-base font-medium text-white">
                          {item.text}
                        </span>
                        <span className="text-sm font-normal text-white opacity-60">
                          {item.code}
                        </span>
                      </div>

                      <div className="flex-grow" />

                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">
                          {item.lastprice}{" "}
                          <span className="font-normal">₺</span>
                        </div>
                        <div
                          className={`${
                            item.rate >= 0 ? "text-success" : "text-danger"
                          } text-xs font-medium`}
                        >
                          {item.rate > 0 && "+"}
                          {item.rate.toFixed(2)}
                        </div>
                      </div>
                    </Link>
                  ))
              ) : (
                <div className="p-4 text-center text-sm text-white opacity-60">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    )
  );
}
