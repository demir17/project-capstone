"use client";

import { useSearchParams } from "next/navigation";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import tailwindConfig from "@/tailwind.config";

// Chart.js konfigürasyonu için gerekli olan bileşenleri kaydediyoruz
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Başlangıç tarihini 5 yıl önce olarak ayarlıyoruz
const startDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 5);

// Veri üretme fonksiyonu
const generateData = (value: number) => {
  const buying = value;
  let initialValue = 1.5;
  const totalPoints = 100;
  const data = [];

  const timeSpan =
    (new Date().getTime() - startDate.getTime()) / (totalPoints - 1);

  for (let i = 0; i < totalPoints; i++) {
    const currentDate = new Date(startDate.getTime() + timeSpan * i);
    const formattedDate = currentDate.toISOString().split("T")[0];

    const randomFluctuation = (Math.random() - 0.5) * 0.2;
    initialValue += (buying - 1.5) / totalPoints + randomFluctuation;

    const point = {
      time: formattedDate,
      value: parseFloat(initialValue.toFixed(2)),
    };

    data.push(point);
  }

  return data;
};

// Chart.js veri setini oluşturuyoruz
const LineChart = () => {
  const search = useSearchParams();
  const buyingValue = Number(search.get("buying")) || 35;

  const data = generateData(buyingValue);

  return (
    <div className="relative grow overflow-hidden rounded-lg max-xl:h-64">
      <Line
        data={{
          labels: data.map((point, index) =>
            index % 10 === 0 ? point.time : "",
          ),
          datasets: [
            {
              label: "Currency Data Example",
              data: data.map((point) => point.value),
              borderColor: tailwindConfig.theme.extend.colors.primary,
              backgroundColor: `${tailwindConfig.theme.extend.colors.primary}33`,
              fill: true,
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                maxTicksLimit: 5,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            tooltip: {
              mode: "index",
              intersect: false,
            },
            legend: {
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
