"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { REGIONS, type PriceRegionId } from "@/lib/currency";

type Props = {
  currentRegionId: PriceRegionId;
  className?: string;
};

export default function CurrencySelector({ currentRegionId, className = "" }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onChange = (regionId: PriceRegionId) => {
    if (regionId === currentRegionId) return;
    startTransition(async () => {
      await fetch("/api/pricing-region", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region: regionId }),
      });
      router.refresh();
    });
  };

  return (
    <label
      className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-labs-subtle ${className}`}
    >
      <span className="sr-only">Display currency</span>
      <span aria-hidden title="Override auto-detected currency">Currency</span>
      <select
        value={currentRegionId}
        onChange={(e) => onChange(e.target.value as PriceRegionId)}
        disabled={isPending}
        className="bg-labs-bg-elevated border border-labs-border rounded-md px-2 py-1.5 text-labs-muted hover:text-labs-fg focus:text-labs-fg focus:border-labs-accent/50 outline-none transition-colors cursor-pointer disabled:opacity-50"
        aria-label="Override display currency (defaults to your location)"
      >
        {(Object.keys(REGIONS) as PriceRegionId[]).map((id) => (
          <option key={id} value={id}>
            {REGIONS[id].currency}
          </option>
        ))}
      </select>
    </label>
  );
}
