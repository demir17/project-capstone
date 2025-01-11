import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Root = {
  success: boolean;
  result: Array<{
    name: string;
    code: string;
    buying: number;
    buyingstr: string;
    selling: number;
    sellingstr: string;
    rate: number;
    time: string;
    date: string;
    datetime: string;
    calculated: number;
  }>;
};

export default function useAllCurrency() {
  const fetchAllCurrency = async (): Promise<Root> => {
    const response = await axios.get(
      "https://api.collectapi.com/economy/allCurrency",
      {
        headers: {
          Authorization: `apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      },
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["allCurrency"],
    queryFn: () => fetchAllCurrency(),
  });
}
