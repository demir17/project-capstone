"use client";

import { useSearchParams } from "next/navigation";
import LineChart from "./LineChart";
import { supabase } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import useHisseSenedi from "@/hooks/react-query/useHisseSenedi";

export type Bist = Array<{
  Tarih: string;
  Şimdi: string;
  Açılış: string;
  Yüksek: string;
  Düşük: string;
  "Hac.": string;
  "Fark %": string;
}>;

export default function ChartFC() {
  const search = useSearchParams();

  const hisseSenedi = useHisseSenedi();

  const filteredData = hisseSenedi?.data?.result.find(
    (item) => item.code == search.get("code"),
  );

  const validCodes = ["A1CAP", "ACSEL"];
  const code = search.get("code") || "A1CAP";

  const { data } = useQuery({
    queryKey: ["bist", search.get("code")],
    queryFn: async (): Promise<Bist> => {
      if (!validCodes.includes(code)) {
        throw new Error("");
      }
      const { data, error } = await supabase.from(code).select("*");

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

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
            {search.get("code")}
          </div>
          <div className="font-['Poppins'] text-lg font-semibold text-[#e4e4e4]">
            {filteredData?.hacim.toLocaleString()}₺
          </div>
        </div>

        {/* <TimeOptions /> */}
      </div>
      {<LineChart data={data} />}
    </div>
  );
}
