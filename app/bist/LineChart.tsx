"use client";

import tailwindConfig from "@/tailwind.config";
import { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { Bist } from "./ChartFC";
import { useSearchParams } from "next/navigation";

const {
  theme: {
    extend: {
      colors: { primary },
    },
  },
} = tailwindConfig;

export default function LineChart({ data }: { data?: Bist }) {
  const search = useSearchParams();

  const mockData = generateMockData();

  const filteredData = data
    ? data
        .map((e) => ({
          date: e.Tarih,
          last: Number(e.Şimdi.replace(",", ".")),
        }))
        .sort((a, b) => {
          const dateA = new Date(a.date.split(".").reverse().join("-"));
          const dateB = new Date(b.date.split(".").reverse().join("-"));
          return dateA.getTime() - dateB.getTime();
        })
    : mockData;

  const primaryAxis = useMemo(
    (): AxisOptions<(typeof filteredData)[0]> => ({
      getValue: (datum) => datum.date,
      elementType: "line",
      minTickPaddingForRotation: 5,
      min: 10,
      tickCount: 2,
    }),
    [],
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<(typeof filteredData)[0]>[] => [
      {
        getValue: (datum) => datum.last,
        elementType: "area",
        tickCount: 12,
        max:
          filteredData
            .map((callbackfn) => callbackfn.last)
            .reduce((a, b) => Math.max(a, b)) * 2,
      },
    ],
    [filteredData],
  );

  return (
    <div className="grow rounded-lg max-xl:h-64">
      <Chart
        options={{
          data: [
            {
              label: search.get("code") ?? "BIST",
              data: filteredData,
            },
          ],
          primaryAxis,
          secondaryAxes,
          dark: true,
          getSeriesStyle: () => ({
            color: primary,
          }),
          defaultColors: [primary],
        }}
      />
    </div>
  );
}

const baseData = [
  { date: "09.12.2024", last: 25.38 },
  { date: "10.12.2024", last: 25.72 },
  { date: "11.12.2024", last: 24.9 },
  { date: "12.12.2024", last: 25.12 },
  { date: "13.12.2024", last: 25.22 },
  { date: "16.12.2024", last: 25.44 },
  { date: "17.12.2024", last: 24.9 },
  { date: "18.12.2024", last: 24.68 },
  { date: "19.12.2024", last: 24.26 },
  { date: "20.12.2024", last: 24.3 },
  { date: "23.12.2024", last: 24.06 },
  { date: "24.12.2024", last: 24.58 },
  { date: "25.12.2024", last: 24.92 },
  { date: "26.12.2024", last: 25 },
  { date: "27.12.2024", last: 26 },
  { date: "30.12.2024", last: 26.78 },
  { date: "31.12.2024", last: 28 },
  { date: "02.01.2025", last: 26.62 },
  { date: "03.01.2025", last: 26.7 },
  { date: "06.01.2025", last: 26.7 },
  { date: "07.01.2025", last: 26.76 },
];

const generateMockData = () => {
  let previousValue = 25.0;
  return baseData.map((item) => {
    const change = (Math.random() * 3 - 1.5).toFixed(2);
    const newValue = parseFloat(
      (previousValue + parseFloat(change)).toFixed(2),
    );
    previousValue = Math.max(10, Math.min(100, newValue));

    return {
      ...item,
      last: previousValue,
    };
  });
};
