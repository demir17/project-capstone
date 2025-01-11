"use client";

import { useState } from "react";
import useHisseSenedi from "@/hooks/react-query/useHisseSenedi";
import { supabase } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function AddPortfolio() {
  const { data } = useHisseSenedi();
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [lotCount, setLotCount] = useState<number | null>(null);
  const [totalValue, setTotalValue] = useState<number | null>(0);
  const [formError, setFormError] = useState<string>("");

  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      return { data, error };
    },
  });

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymbol(e.target.value);
  };

  const handleLotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lot = parseInt(e.target.value);
    setLotCount(lot);

    const selectedStock = data?.result.find(
      (item) => item.code === selectedSymbol,
    );
    if (selectedStock && lot) {
      const stockValue = selectedStock.lastprice;

      // Yeni totalValue'yu hesapla: sadece lotCount ve stockValue'yu çarpıyoruz
      const newTotalValue = stockValue * lot;
      setTotalValue(newTotalValue); // Yeni totalValue'yu ayarla
    }
  };

  const handleSubmit = async () => {
    if (!selectedSymbol || !lotCount) {
      setFormError("Lütfen tüm alanları doldurduğunuzdan emin olun.");
      return;
    }

    const newStock = {
      symbol: selectedSymbol,
      lot_count: lotCount,
      total_value: totalValue,
    };

    const { data: portfolioData, error: fetchError } = await supabase
      .from("portfolios")
      .select("stocks")
      .eq("user_id", user.data?.data.user?.id);

    if (fetchError) {
      console.error("Veri çekme hatası:", fetchError.message);
      return;
    }

    let updatedStocks = [];

    if (portfolioData && portfolioData.length > 0) {
      updatedStocks = portfolioData[0].stocks || [];
    } else {
      updatedStocks = [];
    }

    const existingStockIndex = updatedStocks.findIndex(
      (stock: { symbol: string }) => stock.symbol === selectedSymbol,
    );

    if (existingStockIndex !== -1) {
      updatedStocks[existingStockIndex].lot_count += lotCount!;
      updatedStocks[existingStockIndex].total_value += totalValue!;
    } else {
      updatedStocks.push(newStock);
    }

    const { error: updateError } = await supabase.from("portfolios").upsert(
      [
        {
          user_id: user.data?.data.user?.id,
          stocks: updatedStocks,
        },
      ],
      { onConflict: "user_id" },
    );

    if (updateError) {
      console.error("Güncelleme hatası:", updateError.message);
    } else {
      console.log("Veri başarıyla kaydedildi.");
      setFormError("");
      window.location.reload();
    }
  };

  return (
    <div className="col-span-full row-span-2 flex flex-col gap-8 rounded-[15px] bg-dark-1 p-8 max-xl:h-fit xl:col-span-1">
      <div className="self-start text-base font-medium tracking-wide text-white opacity-60">
        ADD to Portfolio
      </div>

      <div className="grid w-full grid-cols-2 gap-y-2">
        <div className="w-fit text-base font-medium text-white">Symbol = </div>
        <div className="flex h-[26px] w-full items-center justify-start overflow-hidden rounded-lg bg-transparent">
          <select
            className="w-full appearance-none bg-dark-2 pl-3"
            value={selectedSymbol || ""}
            onChange={handleSymbolChange}
          >
            <option value="" disabled>
              Select Symbol
            </option>
            {data?.result.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code}
              </option>
            ))}
          </select>
        </div>

        <div className="w-fit text-base font-medium text-white">
          Lot Count =
        </div>
        <div className="flex h-[26px] w-full items-center justify-start rounded-lg bg-dark-2 pl-3">
          <input
            value={lotCount || ""}
            onChange={handleLotChange}
            placeholder="Type here..."
            className="mr-1 w-full bg-transparent text-sm font-normal text-white outline-none"
          />
        </div>
      </div>

      {formError && (
        <div className="mt-2 text-sm text-red-500">{formError}</div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 rounded-lg bg-blue-500 px-6 py-2 text-white"
      >
        Save to Portfolio
      </button>
    </div>
  );
}
