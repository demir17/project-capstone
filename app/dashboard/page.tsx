"use client";

import BIST from "@/components/ui/BIST";

import TotalValue from "./TotalValue";
import TopGainers from "./TopGainers";
import TopLosses from "./TopLosses";
import MyPortfolio from "./MyPortfolio";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className={`flex grow flex-col overflow-y-auto`}>
        <BIST />

        <div
          className={`grid grow grid-cols-3 gap-8 overflow-y-auto xl:grid-rows-3`}
        >
          <TotalValue />
          <TopGainers />
          <TopLosses />
          <MyPortfolio />
        </div>
      </section>
    </Suspense>
  );
}
