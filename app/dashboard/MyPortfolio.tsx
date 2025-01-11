"use client";

import useHisseSenedi from "@/hooks/react-query/useHisseSenedi";
import { supabase } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type Root = {
  user_id: string;
  stocks: Array<{
    symbol: string;
    lot_count: number;
    total_value: number;
  }>;
};

export default function MyPortfolio() {
  const hisse = useHisseSenedi();

  const { data } = useQuery({
    queryKey: ["my-portfolio"],
    queryFn: async (): Promise<Root> => {
      const user = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .eq("user_id", user.data.user?.id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  return (
    <div className="relative col-span-full row-span-2 overflow-y-auto rounded-[15px] bg-[#1b2028] px-4 pb-8 max-xl:h-96 xl:col-span-1">
      <div className="sticky top-0 z-10 mb-6 bg-dark-1 py-4 pl-4 text-[21px] font-semibold tracking-wide text-[#e4e4e4]">
        My Portfolio
      </div>
      <div className="flex flex-col overflow-y-auto">
        {data?.stocks.map((item, index) => (
          <div key={index} className="flex items-center gap-4 rounded-lg p-4">
            {/* Icon */}
            <Image
              src={`/533/${item.symbol}.svg`}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 flex-shrink-0 rounded-lg bg-[#31353f] object-cover"
            />

            {/* Name and Company */}
            <div className="flex flex-col">
              <span className="text-base font-medium text-white">
                {item.symbol}
              </span>
              {/* <span className="text-sm font-normal text-white opacity-60">
                {item.symbol}
              </span> */}
            </div>

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Price and Change */}
            <div className="text-right">
              <div className="text-sm font-semibold text-white">
                {
                  hisse.data?.result.find((e) => e.code == item.symbol)
                    ?.lastprice
                }{" "}
                <span className="font-normal">₺</span>
              </div>
              <div
                className={`${
                  Number(
                    hisse.data?.result.find((e) => e.code == item.symbol)?.rate,
                  ) > 0
                    ? "text-success"
                    : "text-danger"
                } text-xs font-medium`}              
              >
                {hisse.data?.result.find((e) => e.code == item.symbol)?.rate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
