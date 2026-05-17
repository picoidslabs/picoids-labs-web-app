type Props = {
  items: string[];
  speed?: "slow" | "normal";
  className?: string;
};

export default function Marquee({
  items,
  speed = "normal",
  className = "",
}: Props) {
  const track = [...items, ...items];

  return (
    <div
      className={`marquee-root overflow-hidden border-y border-labs-border ${className}`}
      aria-hidden
    >
      <div
        className={`marquee-track flex w-max gap-12 py-4 ${speed === "slow" ? "marquee-animate-slow" : "marquee-animate"}`}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-2xl md:text-3xl uppercase tracking-[0.2em] text-labs-muted whitespace-nowrap"
          >
            {item}
            <span className="text-labs-accent mx-6">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
