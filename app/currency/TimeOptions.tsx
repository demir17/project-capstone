const options = [
  { label: "1h", active: true },
  { label: "3h", active: false },
  { label: "1d", active: false },
  { label: "1w", active: false },
  { label: "1m", active: false },
];

export default function TimeOptions() {
  return (
    <div className="inline-flex h-[22px] items-start justify-start gap-2.5">
      {options.map((option, index) => (
        <div
          key={index}
          className={`flex items-center justify-center gap-[15px] rounded-[15px] px-[15px] py-2 ${
            option.active
              ? "bg-[#396ef7]"
              : "border border-[#31353f] text-[#9e9e9e]"
          }`}
        >
          <div
            className={`text-center font-['Poppins'] text-[10px] font-medium leading-snug ${
              option.active ? "text-[#e4e4e4]" : ""
            }`}
          >
            {option.label}
          </div>
        </div>
      ))}
    </div>
  );
}
