"use client";

import useHisseSenedi, {
  HisseSenedi,
} from "@/hooks/react-query/useHisseSenedi";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
export default function Bist() {
  const { data } = useHisseSenedi();
  const pageData = data?.result;
  const { push } = useRouter();
  const search = useSearchParams();
  const ref = useRef<HTMLAnchorElement>(null);

  const [selected, setSelected] = useState<
    HisseSenedi["result"][0] | undefined
  >();

  const code = search.get("code");

  useEffect(() => {
    if (!!!code && pageData) {
      setSelected(pageData[0]);
      push("/bist?code=" + pageData[0].code);
    }
  }, [pageData, push, code]);

  useEffect(() => {
    if (code) {
      const el = document.getElementById(code);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setSelected(pageData?.find((item) => item.code == code));
      }
    }
  }, [code, pageData]);

  return (
    <div className="relative col-span-full row-span-3 overflow-y-auto rounded-[15px] bg-[#1b2028] px-4 pb-8 max-xl:h-96 xl:col-span-1">
      <div className="sticky top-0 z-10 mb-6 bg-dark-1 py-4 pl-4 text-[21px] font-semibold tracking-wide text-[#e4e4e4]">
        BIST
      </div>
      <div className="flex flex-col overflow-y-auto">
        {pageData
          ?.sort((a, b) => a.code.localeCompare(b.code))
          .map((item) => (
            <Link
              href={{
                pathname: "/bist",
                query: { code: item.code },
              }}
              id={item.code}
              ref={ref}
              key={item.code}
              className={`${selected?.code == item.code || search.get("code") == item.code ? "bg-dark-2" : ""} flex cursor-pointer items-center gap-4 rounded-lg p-4`}
              onClick={() => setSelected(item)}
            >
              {/* Icon */}
              <Image
                src={`/533/${item.code}.svg`}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 flex-shrink-0 rounded-lg bg-[#31353f] object-cover"
              />

              {/* Name and Company */}
              <div className="flex flex-col">
                <span className="text-base font-medium text-white">
                  {item.text}
                </span>
                <span className="text-sm font-normal text-white opacity-60">
                  {item.code}
                </span>
              </div>

              {/* Spacer */}
              <div className="flex-grow" />

              {/* Price and Change */}
              <div className="text-right">
                <div className="text-sm font-semibold text-white">
                  {item.lastprice} <span className="font-normal">₺</span>
                </div>
                <div
                  className={`${item.rate >= 0 ? "text-success" : "text-danger"} text-xs font-medium`}
                >
                  {item.rate > 0 && "+"}
                  {item.rate.toFixed(2)}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
