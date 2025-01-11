import BIST from "@/components/ui/BIST";
import Bist from "./Bist";
import Chart from "./ChartFC";
import Information from "./Information";
import { Suspense } from "react";

export default function Page() {
  return (
    <section className={`flex grow flex-col overflow-y-auto`}>
      <BIST />

      <div
        className={`grid grow grid-cols-3 gap-8 overflow-y-auto xl:grid-rows-3`}
      >
        <Suspense>
          <Bist />
          <Chart />
          <Information />
        </Suspense>
      </div>
    </section>
  );
}
