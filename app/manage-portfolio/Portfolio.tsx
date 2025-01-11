"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import useHisseSenedi from "@/hooks/react-query/useHisseSenedi";

// Data type for the stocks in the portfolio
type Root = {
  user_id: string;
  stocks: Array<{
    symbol: string;
    lot_count: number;
    total_value: number;
  }>;
};

export default function PortfolioCard() {
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

  // Mutation to update the portfolio after a deletion
  const updatePortfolioMutation = useMutation({
    mutationKey: ["portfolio"],
    mutationFn: async (
      updatedStocks: Array<{
        symbol: string;
        lot_count: number;
        total_value: number;
      }>,
    ) => {
      const user = await supabase.auth.getUser();
      await supabase
        .from("portfolios")
        .update({ stocks: updatedStocks })
        .eq("user_id", user.data.user?.id);
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  // Delete a stock from the portfolio
  const handleDelete = (symbol: string) => {
    if (!data?.stocks) return;

    // Filter out the stock to delete
    const updatedStocks = data.stocks.filter(
      (stock) => stock.symbol !== symbol,
    );

    // Call mutation to update the portfolio in the database
    updatePortfolioMutation.mutate(updatedStocks);
  };

  return (
    <div className="relative col-span-full row-span-full overflow-y-auto rounded-[15px] bg-dark-1 p-4 xl:col-span-2">
      <table className="min-w-full table-auto rounded-lg text-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">
              <div className="text-[21px] font-semibold tracking-wide text-[#e4e4e4]">
                Portfolio
              </div>
            </th>
            <th align="center" className="px-4 py-2 text-left">
              <div className="h-[15px] text-sm font-normal text-white opacity-60">
                Profit % / Lot{" "}
              </div>
            </th>
            <th align="center" className="px-4 py-2 text-left">
              <div className="h-[15px] w-fit text-sm font-normal text-white opacity-60">
                Profit
              </div>
            </th>
            <th className="px-4 py-2 text-left">
              <div className="h-[15px] w-fit text-sm font-normal text-white opacity-60">
                Current{" "}
              </div>
            </th>
            <th className="px-4 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {data?.stocks.map((item, index) => (
            <tr key={index} className="border-t border-[#444]">
              <td className="px-4 py-2">
                <div className={`flex items-center gap-2`}>
                  <Image
                    src={`/533/${item.symbol}.svg`}
                    alt=""
                    width={24}
                    height={24}
                    className="shrink-0 rounded bg-[#31353f] object-cover"
                  />
                  <p>{item.symbol}</p>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className={`flex w-fit flex-col`}>
                  <div className="text-right font-['Poppins'] text-xs font-medium leading-normal">
                    {(() => {
                      const stock = hisse.data?.result.find(
                        (predicate) => predicate.code === item.symbol,
                      );

                      if (stock) {
                        const currentPrice = stock.lastprice ?? 0;
                        const previousTotalValue = item.total_value ?? 0;
                        const currentTotalValue = currentPrice * item.lot_count;

                        // Artışı hesapla
                        const priceChangePercentage =
                          ((currentTotalValue - previousTotalValue) /
                            previousTotalValue) *
                          100;

                        const isPositiveChange = priceChangePercentage > 0;

                        return (
                          <span
                            className={
                              isPositiveChange ? "text-success" : "text-danger"
                            }
                          >
                            {priceChangePercentage.toFixed(2)}%
                          </span>
                        );
                      }

                      return "0%";
                    })()}
                  </div>
                  <div className="h-[15px] w-[70px] text-right font-['Poppins'] text-sm font-semibold text-white">
                    {item.lot_count} Lot
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="h-[15px] w-[70px] text-right font-['Poppins'] text-sm font-semibold text-white">
                  {Number(
                    (hisse.data?.result.find(
                      (predicate) => predicate.code === item.symbol,
                    )?.lastprice ?? 0) *
                      item.lot_count -
                      item.total_value,
                  ).toFixed(2)}
                  ₺
                </div>
              </td>
              <td className="px-4 py-2">
                <div className={`flex w-fit flex-col`}>
                  <div
                    className={`${
                      (hisse.data?.result?.find(
                        (predicate) => predicate.code === item.symbol,
                      )?.rate ?? 0) >= 0
                        ? "text-success"
                        : "text-danger"
                    } text-right font-['Poppins'] text-xs font-medium leading-normal`}
                  >
                    {
                      hisse.data?.result.find(
                        (predicate) => predicate.code === item.symbol,
                      )?.rate
                    }
                    %
                  </div>
                  <div className="h-[15px] w-[70px] text-right font-['Poppins'] text-sm font-semibold text-white">
                    {
                      hisse.data?.result.find(
                        (predicate) => predicate.code === item.symbol,
                      )?.lastprice
                    }
                    ₺
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <button onClick={() => handleDelete(item.symbol)}>
                  <i className="ph ph-x rounded bg-danger p-1"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
