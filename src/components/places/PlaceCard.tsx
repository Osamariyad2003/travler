import { CATEGORY_COLORS, CATEGORY_EMOJI, CATEGORY_LABELS } from "@/lib/constants";
import type { Place } from "@/lib/types";

interface PlaceCardProps {
  place: Place;
  onFocus?: (place: Place) => void;
}

export default function PlaceCard({ place, onFocus }: PlaceCardProps) {
  const isWarning =
    place.category === "safety_warning" || place.category === "scam_warning";
  const Wrapper = onFocus ? "button" : "div";

  return (
    <Wrapper
      type={onFocus ? "button" : undefined}
      onClick={onFocus ? () => onFocus(place) : undefined}
      className={`flex w-full flex-col gap-3 rounded-2xl bg-white p-4 text-left shadow-card ring-1 transition ${
        onFocus ? "hover:-translate-y-0.5 hover:shadow-soft" : ""
      } ${isWarning ? "ring-red-200" : "ring-cocoa-100"}`}
    >
      <header className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full text-base text-white"
          style={{ backgroundColor: CATEGORY_COLORS[place.category] }}
          aria-hidden="true"
        >
          {CATEGORY_EMOJI[place.category]}
        </span>
        <div>
          <h3 className="font-display text-base font-semibold text-cocoa-800">
            {place.name}
          </h3>
          <p className="text-[11px] uppercase tracking-widest text-coral-600">
            {CATEGORY_LABELS[place.category]}
          </p>
        </div>
      </header>
      <p className="text-sm text-cocoa-600">{place.description}</p>
      <p className="text-xs">
        <span className="font-semibold text-cocoa-800">Cost:</span>{" "}
        <span className="text-cocoa-500">{place.estimatedCost}</span>
      </p>
    </Wrapper>
  );
}
