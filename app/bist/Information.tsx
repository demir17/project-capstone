"use client";

import { useSearchParams } from "next/navigation";
import useHisseSenedi from "@/hooks/react-query/useHisseSenedi";

export default function Information() {
  const search = useSearchParams();

  const { data } = useHisseSenedi();

  const filteredData = data?.result.find(
    (item) => item.code == search.get("code"),
  );

  return (
    <div className="relative col-span-full row-span-1 overflow-y-auto rounded-[15px] bg-[#1b2028] px-4 pb-8 max-xl:h-fit xl:col-span-2">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-dark-1 py-4 text-[21px] font-semibold tracking-wide text-[#e4e4e4]">
        Information
        {/* <div className="inline-flex h-8 items-center justify-center gap-2.5 rounded-[5px] border border-[#31353f] px-2.5 py-[5px]">
          <div className="text-center font-['Poppins'] text-[10px] font-semibold leading-snug text-[#e4e4e4] opacity-60">
             More
          </div>
        </div> */}
      </div>
      <div className="overflow-x-auto rounded-md p-4">
        <table className="w-max min-w-full text-left text-sm text-[#e4e4e4]">
          <thead>
            <tr className="">
              <th className="px-4 py-2 font-medium text-disabled">Name</th>
              <th className="px-4 py-2 font-medium text-disabled">Change</th>
              <th className="px-4 py-2 font-medium text-disabled">
                Market Cap
              </th>
              <th className="px-4 py-2 font-medium text-disabled">
                Opening Price
              </th>
              <th className="px-4 py-2 font-medium text-disabled">Price</th>
            </tr>
          </thead>
          {filteredData && (
            <tbody>
              <tr className="">
                <td className="px-4 py-2">{filteredData?.code}</td>
                <td className="px-4 py-2 font-medium text-success">
                  <div
                    className={`${Number(filteredData?.rate) > 0 ? "text-success" : "text-danger"} text-xs font-medium`}
                  >
                    {filteredData?.rate}%
                  </div>
                </td>
                <td className="px-4 py-2">
                  {filteredData?.hacim?.toLocaleString()} ₺
                </td>

                <td className="px-4 py-2">
                  {Number(
                    (filteredData?.lastprice / (100 + filteredData?.rate)) *
                      100,
                  ).toFixed(2)}{" "}
                  ₺
                </td>

                <td className="px-4 py-2">{filteredData?.lastprice} ₺</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
