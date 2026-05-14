import Image from "next/image";
import Link from "next/link";

import type { Photo, TripTemplate } from "@/lib/types";

interface TripTemplateCardProps {
  template: TripTemplate;
  cityName?: string;
  photo?: Photo;
  href?: string | null;
  ctaLabel?: string;
}

const STYLE_LABEL: Record<TripTemplate["travelStyle"], string> = {
  budget: "Budget",
  student: "Student",
  backpacker: "Backpacker",
  family: "Family",
  solo: "Solo",
  couple: "Couple",
};

export default function TripTemplateCard({
  template,
  cityName,
  photo,
  href,
  ctaLabel = "Open trip plan",
}: TripTemplateCardProps) {
  const detailHref = href === undefined ? `/templates/${template.id}` : href;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-cocoa-100">
      <div className="relative aspect-[16/10] w-full bg-coral-100">
        {photo ? (
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-coral-200 to-coral-400 font-display text-2xl text-cocoa-800">
            {cityName ?? template.cityId}
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-coral-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
          {STYLE_LABEL[template.travelStyle]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <header className="space-y-1">
          <h3 className="font-display text-2xl font-semibold text-cocoa-800">
            {template.title}
          </h3>
          <p className="flex flex-wrap gap-2 text-xs text-cocoa-500">
            <span>{template.days} day{template.days === 1 ? "" : "s"}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-coral-600">
              {template.estimatedBudget}
            </span>
            {cityName ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{cityName}</span>
              </>
            ) : null}
          </p>
        </header>

        <ol className="space-y-2 text-sm text-cocoa-600">
          {template.itinerary.map((day) => (
            <li key={day.day} className="rounded-2xl bg-coral-50 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-coral-600">
                Day {day.day} · {day.title}
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
                {day.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {template.tips.length ? (
          <section className="rounded-2xl bg-cocoa-800 p-3 text-xs text-coral-100">
            <p className="font-semibold uppercase tracking-widest text-coral-200">
              Local tips
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              {template.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {detailHref ? (
          <Link
            href={detailHref}
            className="mt-auto inline-flex items-center justify-center gap-1 rounded-full bg-coral-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-coral-600"
          >
            {ctaLabel}
          <span aria-hidden="true">→</span>
          </Link>
        ) : null}

        {photo ? (
          <p className="pt-2 text-[10px] text-cocoa-400">
            Photo by{" "}
            {photo.credit.profileUrl ? (
              <a
                href={photo.credit.profileUrl}
                rel="noreferrer noopener"
                target="_blank"
                className="underline hover:text-coral-600"
              >
                {photo.credit.name}
              </a>
            ) : (
              photo.credit.name
            )}{" "}
            ·{" "}
            <a
              href={photo.sourceUrl}
              rel="noreferrer noopener"
              target="_blank"
              className="underline hover:text-coral-600"
            >
              {photo.sourceName}
            </a>
          </p>
        ) : null}
      </div>
    </article>
  );
}
