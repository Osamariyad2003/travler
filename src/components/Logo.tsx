/**
 * Inline SVG map-pin logo. Matches the coral pins used by Leaflet markers
 * elsewhere in the app so the brand glyph and the data viz speak the same
 * visual language.
 *
 * Pass a Tailwind colour class via `className` to recolour
 * (e.g. `text-coral-500`, `text-white`). Defaults to coral-500 + h-6 w-6.
 */
export default function Logo({
  className = "h-6 w-6 text-coral-500",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {/* Teardrop pin with a hollow centre. The hole is achieved via
          fill-rule="evenodd": the outer pin path is filled, the inner
          circle subtracts. Same trick Google Maps uses. */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C7.582 2 4 5.582 4 10c0 5.523 5.13 10.764 7.293 12.707a1 1 0 001.414 0C14.87 20.764 20 15.523 20 10c0-4.418-3.582-8-8-8zm0 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
      />
    </svg>
  );
}
