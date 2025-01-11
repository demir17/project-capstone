"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Exchange() {
  const search = useSearchParams();
  const buyingRate = parseFloat(search.get("buying") || "1"); // Döviz kuru

  const [tryValue, setTryValue] = useState<string>(""); // TRY input değeri
  const [foreignValue, setForeignValue] = useState<string>(""); // Döviz input değeri

  // TRY değiştiğinde
  const handleTryChange = (value: string) => {
    setTryValue(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setForeignValue((numericValue / buyingRate).toFixed(2));
    } else {
      setForeignValue("");
    }
  };

  // Döviz değiştiğinde
  const handleForeignChange = (value: string) => {
    setForeignValue(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setTryValue((numericValue * buyingRate).toFixed(2));
    } else {
      setTryValue("");
    }
  };

  return (
    <div className="col-span-full flex flex-col justify-between rounded-[15px] bg-[#1b2028] p-4 max-xl:h-48 xl:col-span-1 xl:row-span-1">
      <div className="text-[21px] font-semibold text-white">Exchange</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="text-xl font-normal text-white">TRY</div>
          <div className="relative h-[18px] w-[18px]"></div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-xl font-normal text-white">
            {search.get("code") || "USD"}
          </div>
          <div className="relative h-[18px] w-[18px]"></div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* TRY Input */}
        <input
          type="text"
          value={tryValue}
          onChange={(e) => handleTryChange(e.target.value)}
          className="flex h-[26px] w-24 items-center rounded-lg bg-[#808080]/60 pl-3 text-sm font-normal text-white focus:outline-none xl:w-[155px]"
          placeholder="TRY"
        />

        <div className="flex justify-center text-xl font-bold text-white">
          =
        </div>

        {/* Foreign Currency Input */}
        <input
          type="text"
          value={foreignValue}
          onChange={(e) => handleForeignChange(e.target.value)}
          className="flex h-[26px] w-24 items-center rounded-lg bg-[#808080]/60 pl-3 text-sm font-normal text-white focus:outline-none xl:w-[155px]"
          placeholder={search.get("code") || "USD"}
        />
      </div>
    </div>
  );
}
