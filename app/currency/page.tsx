import { Suspense } from "react";
import ChartFC from "./ChartFC";
import Currencies from "./Currencies";
import Exchange from "./Exchange";

export default function Page() {
  return (
    <section className={`flex grow flex-col overflow-y-auto`}>
      <div
        className={`grid grow grid-cols-3 gap-8 overflow-y-auto xl:grid-rows-3`}
      >
        <Suspense>
          <Currencies />
          <Exchange />
          <ChartFC />
        </Suspense>
      </div>
    </section>
  );
}
