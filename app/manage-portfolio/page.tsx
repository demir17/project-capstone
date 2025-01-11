import { Suspense } from "react";
import AddPortfolio from "./AddPortfolio";
import PortfolioCard from "./Portfolio";
import TotalValue from "./TotalValue";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className={`flex grow flex-col overflow-y-auto`}>
        <div
          className={`grid grow grid-cols-3 gap-8 overflow-y-auto xl:grid-rows-3`}
        >
          <PortfolioCard />
          <TotalValue />
          <AddPortfolio />
        </div>
      </section>
    </Suspense>
  );
}
