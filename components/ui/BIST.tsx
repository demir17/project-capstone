import Link from "next/link";

export default function BIST() {
  return (
    <div
      className={`mb-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4`}
    >
      <Link
        href={"/bist"}
        className="flex h-[87px] w-full flex-col items-center justify-center rounded-[15px] bg-dark-1 drop-shadow"
      >
        <div className="text-base font-semibold text-white">BIST 30</div>
        <div className="text-xs font-normal text-white opacity-60">
          Top 30 BIST Stocks
        </div>
      </Link>

      <Link
        href={"/bist"}
        className="flex h-[87px] w-full flex-col items-center justify-center rounded-[15px] bg-dark-1 drop-shadow"
      >
        <div className="text-base font-semibold text-white">BIST 50</div>
        <div className="text-xs font-normal text-white opacity-60">
          Top 50 BIST Stocks
        </div>
      </Link>

      <Link
        href={"/bist"}
        className="flex h-[87px] w-full flex-col items-center justify-center rounded-[15px] bg-dark-1 drop-shadow"
      >
        <div className="text-base font-semibold text-white">BIST 100</div>
        <div className="text-xs font-normal text-white opacity-60">
          Top 100 BIST stocks
        </div>
      </Link>

      <Link
        href={"/bist"}
        className="flex h-[87px] w-full flex-col items-center justify-center rounded-[15px] bg-dark-1 drop-shadow"
      >
        <div className="text-base font-semibold text-white">BIST</div>
        <div className="text-xs font-normal text-white opacity-60">
          All BIST Stocks
        </div>
      </Link>
    </div>
  );
}
