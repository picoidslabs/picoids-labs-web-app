import type { ServiceGlyphId } from "@/lib/services";

type Props = {
  id: ServiceGlyphId;
  className?: string;
};

export default function ServiceGlyph({ id, className = "w-full h-full" }: Props) {
  const shared = "stroke-current fill-none stroke-[1.5]";

  switch (id) {
    case "web":
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden>
          <rect x="8" y="14" width="64" height="44" rx="4" className={shared} />
          <line x1="8" y1="26" x2="72" y2="26" className={shared} />
          <circle cx="16" cy="20" r="2" className="fill-current stroke-none" />
          <circle cx="24" cy="20" r="2" className="fill-current stroke-none" />
          <rect x="18" y="36" width="28" height="4" rx="1" className="fill-current stroke-none opacity-60" />
          <rect x="18" y="46" width="44" height="3" rx="1" className="fill-current stroke-none opacity-40" />
          <path d="M40 58 L52 70 L28 70 Z" className={shared} />
        </svg>
      );
    case "webapp":
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden>
          <rect x="10" y="12" width="60" height="44" rx="4" className={shared} />
          <rect x="16" y="20" width="48" height="8" rx="2" className="fill-current stroke-none opacity-50" />
          <rect x="16" y="34" width="20" height="14" rx="2" className={shared} opacity="0.7" />
          <rect x="40" y="34" width="24" height="6" rx="1" className={shared} opacity="0.5" />
          <rect x="40" y="44" width="24" height="4" rx="1" className={shared} opacity="0.35" />
          <rect x="14" y="60" width="52" height="10" rx="2" className={shared} />
        </svg>
      );
    case "mobile":
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden>
          <rect x="24" y="6" width="32" height="68" rx="6" className={shared} />
          <rect x="30" y="14" width="20" height="48" rx="2" className={shared} opacity="0.5" />
          <circle cx="40" cy="68" r="3" className="fill-current stroke-none" />
          <path d="M34 22 H46" className={shared} />
          <path d="M32 50 Q40 58 48 50" className={shared} />
        </svg>
      );
    case "seo":
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden>
          <circle cx="34" cy="34" r="18" className={shared} />
          <line x1="48" y1="48" x2="68" y2="68" className={shared} strokeWidth="3" />
          <path d="M28 34 L32 38 L42 28" className={shared} strokeWidth="2" />
          <path d="M8 62 Q24 50 40 62 T72 58" className={shared} opacity="0.7" />
        </svg>
      );
    case "marketing":
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden>
          <path d="M8 40 Q20 8 40 24 T72 20 L60 40 L72 60 Q48 72 32 56 T8 40" className={shared} />
          <circle cx="52" cy="28" r="6" className={shared} />
          <line x1="12" y1="68" x2="68" y2="68" className={shared} opacity="0.5" />
        </svg>
      );
  }
}
