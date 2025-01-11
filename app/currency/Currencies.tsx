"use client";

import useAllCurrency from "@/hooks/react-query/useAllCurrency";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Currencies() {
  const { data = { result: [] } } = useAllCurrency();
  const { replace } = useRouter();

  const [selected, setSelected] = useState<(typeof data.result)[0] | null>(
    null,
  );

  useEffect(() => {
    if (data) {
      setSelected(data.result[0]);
    }
  }, [data]);

  useEffect(() => {
    if (selected) {
      replace(`/currency?code=${selected.code}&buying=${selected.buying}`);
    }
  }, [replace, selected]);

  return (
    <div className="relative col-span-full overflow-y-auto rounded-[15px] bg-[#1b2028] px-4 pb-8 max-xl:h-96 xl:col-span-1 xl:row-span-3">
      <div className="sticky top-0 z-10 mb-6 bg-dark-1 py-4 pl-4 text-[21px] font-semibold tracking-wide text-[#e4e4e4]">
        Currencies
      </div>
      <div className="flex flex-col overflow-y-auto">
        {data?.result.map((item, index) => (
          <div
            key={index}
            className={`${selected?.name == item.name ? "bg-black/25" : ""} flex cursor-pointer items-center gap-4 rounded-lg p-4`}
            onClick={() => setSelected(item)}
          >
            {/* Icon */}
            {/* <div className="h-11 w-11 flex-shrink-0 rounded-lg bg-[#31353f]" /> */}

            {/* Name and Company */}
            <div className="flex flex-col">
              <span className="text-base font-medium text-white">
                {item.code}
              </span>
              <span className="text-xs font-medium text-white/50">
                {item.name}
              </span>
            </div>

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Price and Change */}
            <div className="text-right">
              <div className="flex gap-4 text-sm font-semibold text-white">
                <div className={`flex flex-col`}>
                  <p className={`text-xs text-white/50`}>Buying(TL)</p>
                  <p className={`text-success`}>{item.buying}</p>
                </div>
                <div className={`flex flex-col`}>
                  <p className={`text-xs text-white/50`}>Selling(TL)</p>
                  <p className={`text-success`}>{item.selling}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
