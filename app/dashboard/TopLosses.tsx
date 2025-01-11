"use client";

import useHisseSenedi from "@/hooks/react-query/useHisseSenedi";
import Image from "next/image";

export default function TopLosses() {
  const { data } = useHisseSenedi();
  const pageData = data?.result;

  return (
    <div className="relative col-span-full row-span-3 overflow-y-auto rounded-[15px] bg-[#1b2028] px-8 pb-8 max-xl:h-96 xl:col-span-1">
      <div className="sticky top-0 z-10 mb-6 bg-dark-1 py-4 pl-4 text-[21px] font-semibold tracking-wide text-[#e4e4e4]">
        Top Losses
      </div>
      <div className="flex flex-col">
        {pageData
          ?.sort((a, b) => a.rate - b.rate) // `rate` değerine göre sıralama (küçükten büyüğe)
          .slice(0, 10) // İlk 10 öğeyi al
          .map((item) => (
            <div
              key={item.code}
              className="flex items-center gap-4 rounded-lg p-4"
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
            </div>
          ))}
      </div>
    </div>
  );
}
