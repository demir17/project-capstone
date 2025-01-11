import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type HisseSenedi = {
  success: boolean;
  result: Array<{
    rate: number;
    lastprice: number;
    lastpricestr: string;
    hacim: number;
    hacimstr: string;
    min: number;
    minstr: string;
    max: number;
    maxstr: string;
    time: string;
    text: string;
    code: string;
    icon: string;
  }>;
};

export default function useHisseSenedi() {
  const fetchStockData = async (): Promise<HisseSenedi> => {
    const response = await axios.get(
      "https://api.collectapi.com/economy/hisseSenedi",
      {
        headers: {
          Authorization: `apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      },
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["hisseSenedi"],
    queryFn: () => fetchStockData(),
  });
}
