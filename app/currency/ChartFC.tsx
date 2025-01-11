"use client";

import { useSearchParams } from "next/navigation";
import LineChart from "./LineChart";

export default function ChartFC() {
  const search = useSearchParams();

  return (
    <div className="relative col-span-full row-span-2 flex flex-col rounded-[15px] bg-[#1b2028] px-4 pb-8 max-xl:h-fit xl:col-span-2">
      <div className="sticky top-0 z-10 mb-6 bg-dark-1 py-4 text-[21px] font-semibold tracking-wide text-[#e4e4e4]">
        Chart
      </div>

      <div
        className={`mb-4 flex shrink-0 flex-wrap items-center justify-between gap-4`}
      >
        <div className={`flex flex-col justify-center gap-1`}>
          <div className="font-['Poppins'] text-sm font-normal text-[#e4e4e4] opacity-60">
            TRY/{search.get("code")}
          </div>
          <div className="font-['Poppins'] text-lg font-semibold text-[#e4e4e4]">
            {search.get("buying")}
          </div>
        </div>

        {/* <TimeOptions /> */}
      </div>
      <LineChart />
    </div>
  );
}
