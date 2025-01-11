"use client";

import { supabase } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

type Root = {
  user_id: string;
  stocks: Array<{
    symbol: string;
    lot_count: number;
    total_value: number;
  }>;
};
export default function TotalValue() {
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
    <div className="col-span-full row-span-1 flex flex-col items-center gap-8 rounded-[15px] bg-[#396ef7] p-8 max-xl:h-fit xl:col-span-1">
      <div className="self-start text-base font-medium tracking-wide text-white opacity-60">
        Total Value
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-white">
            {Number(
              data?.stocks.reduce((acc, stock) => {
                return acc + stock.total_value;
              }, 0),
            ).toLocaleString() || " "}
          </span>
          <span className="text-2xl font-normal text-white">₺</span>
        </div>
        {/* <div className="mt-1 text-base font-medium text-[#f46d21]">-13.40%</div> */}
      </div>
    </div>
  );
}
