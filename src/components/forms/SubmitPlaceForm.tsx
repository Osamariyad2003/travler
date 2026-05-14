"use client";

import { useState } from "react";

import {
  CATEGORY_LABELS,
  PLACE_CATEGORIES,
} from "@/lib/constants";
import { isFirebaseConfigured } from "@/lib/firebase";
import { submitPlace } from "@/lib/firestore";
import type { City, PlaceCategory, PlaceSubmissionInput } from "@/lib/types";
import {
  parseCoordinate,
  validatePlaceSubmission,
} from "@/lib/validators";

interface SubmitPlaceFormProps {
  cities: City[];
  userId?: string;
}

interface FormState {
  cityId: string;
  name: string;
  category: PlaceCategory;
  latitude: string;
  longitude: string;
  estimatedCost: string;
  description: string;
  localTip: string;
  source: string;
}

const EMPTY_STATE: FormState = {
  cityId: "",
  name: "",
  category: "free_activity",
  latitude: "",
  longitude: "",
  estimatedCost: "",
  description: "",
  localTip: "",
  source: "",
};

export default function SubmitPlaceForm({
  cities,
  userId,
}: SubmitPlaceFormProps) {
  const [state, setState] = useState<FormState>(() => ({
    ...EMPTY_STATE,
    cityId: cities[0]?.id ?? "",
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "submitting" }
    | { type: "success"; mock: boolean }
    | { type: "error"; message: string }
  >({ type: "idle" });

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input: Partial<PlaceSubmissionInput> = {
      cityId: state.cityId,
      name: state.name.trim(),
      category: state.category,
      latitude: parseCoordinate(state.latitude),
      longitude: parseCoordinate(state.longitude),
      estimatedCost: state.estimatedCost.trim(),
      description: state.description.trim(),
      localTip: state.localTip.trim(),
      source: state.source.trim() || undefined,
    };
    const result = validatePlaceSubmission(input);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus({ type: "idle" });
      return;
    }
    setErrors({});
    setStatus({ type: "submitting" });
    const submission = await submitPlace(
      userId ?? "anonymous",
      input as PlaceSubmissionInput
    );
    if (!submission.ok) {
      setStatus({
        type: "error",
        message: submission.error ?? "Could not save submission.",
      });
      return;
    }
    setStatus({ type: "success", mock: submission.mock });
    setState({ ...EMPTY_STATE, cityId: state.cityId });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {!isFirebaseConfigured ? (
        <p className="rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Firebase is not configured. Submissions will run in mock mode and
          won&apos;t actually be saved. Add your Firebase config to{" "}
          <code>.env.local</code> to enable persistence.
        </p>
      ) : null}

      <Field
        label="City"
        error={errors.cityId}
        input={
          <select
            value={state.cityId}
            onChange={(e) => update("cityId", e.target.value)}
            className="form-input"
          >
            <option value="" disabled>
              Choose a city
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}, {city.country}
              </option>
            ))}
          </select>
        }
      />

      <Field
        label="Place name"
        error={errors.name}
        input={
          <input
            type="text"
            value={state.name}
            onChange={(e) => update("name", e.target.value)}
            className="form-input"
            placeholder="e.g. Hashem Restaurant"
            required
          />
        }
      />

      <Field
        label="Category"
        error={errors.category}
        input={
          <select
            value={state.category}
            onChange={(e) => update("category", e.target.value as PlaceCategory)}
            className="form-input"
          >
            {PLACE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label="Latitude"
          error={errors.latitude}
          input={
            <input
              type="number"
              step="any"
              value={state.latitude}
              onChange={(e) => update("latitude", e.target.value)}
              className="form-input"
              placeholder="e.g. 31.9539"
              required
            />
          }
        />
        <Field
          label="Longitude"
          error={errors.longitude}
          input={
            <input
              type="number"
              step="any"
              value={state.longitude}
              onChange={(e) => update("longitude", e.target.value)}
              className="form-input"
              placeholder="e.g. 35.9106"
              required
            />
          }
        />
      </div>

      <Field
        label="Estimated cost"
        error={errors.estimatedCost}
        hint="Write 'Free' if there is no cost."
        input={
          <input
            type="text"
            value={state.estimatedCost}
            onChange={(e) => update("estimatedCost", e.target.value)}
            className="form-input"
            placeholder="e.g. 2 – 4 JOD"
            required
          />
        }
      />

      <Field
        label="Description"
        error={errors.description}
        input={
          <textarea
            value={state.description}
            onChange={(e) => update("description", e.target.value)}
            className="form-input min-h-[80px]"
            rows={3}
            required
          />
        }
      />

      <Field
        label="Local tip"
        error={errors.localTip}
        input={
          <textarea
            value={state.localTip}
            onChange={(e) => update("localTip", e.target.value)}
            className="form-input min-h-[60px]"
            rows={2}
            required
          />
        }
      />

      <Field
        label="Source (optional)"
        error={errors.source}
        hint="A blog post, guidebook, or 'Personal visit'."
        input={
          <input
            type="text"
            value={state.source}
            onChange={(e) => update("source", e.target.value)}
            className="form-input"
          />
        }
      />

      <button
        type="submit"
        className="btn-primary"
        disabled={status.type === "submitting"}
      >
        {status.type === "submitting" ? "Saving…" : "Submit place"}
      </button>

      {status.type === "success" ? (
        <p className="rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
          {status.mock
            ? "Submission accepted in mock mode (Firebase not configured). It is not stored."
            : "Thanks! Your submission is pending review."}
        </p>
      ) : null}
      {status.type === "error" ? (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  input,
}: {
  label: string;
  error?: string;
  hint?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-cocoa-800">{label}</span>
      {input}
      {hint && !error ? (
        <span className="block text-xs text-cocoa-500">{hint}</span>
      ) : null}
      {error ? (
        <span className="block text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  );
}
