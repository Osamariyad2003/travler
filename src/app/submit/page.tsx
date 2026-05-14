import SubmitPlaceForm from "@/components/forms/SubmitPlaceForm";
import { fetchCities } from "@/lib/firestore";

export const dynamic = "force-dynamic";

export default async function SubmitPage() {
  const cities = await fetchCities();
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-semibold text-cocoa-800 sm:text-5xl">
          Submit a place
        </h1>
        <div className="mt-3 h-px w-20 bg-coral-300" />
        <p className="mt-3 text-sm text-cocoa-500">
          Help fellow travellers by sharing free activities, cheap food, water
          refill spots, or scam warnings. Submissions are reviewed before they
          appear on the map.
        </p>
      </header>
      <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-cocoa-100">
        <SubmitPlaceForm cities={cities} />
      </div>
    </div>
  );
}
