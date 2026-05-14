import { PLACE_CATEGORIES } from "./constants";
import type { PlaceCategory, PlaceSubmissionInput } from "./types";

export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
}

export function isValidLatitude(value: number): boolean {
  return Number.isFinite(value) && value >= -90 && value <= 90;
}

export function isValidLongitude(value: number): boolean {
  return Number.isFinite(value) && value >= -180 && value <= 180;
}

export function isValidCategory(value: string): value is PlaceCategory {
  return (PLACE_CATEGORIES as string[]).includes(value);
}

export function validatePlaceSubmission(
  input: Partial<PlaceSubmissionInput>
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.cityId || input.cityId.trim() === "") {
    errors.cityId = "City is required.";
  }
  if (!input.name || input.name.trim() === "") {
    errors.name = "Name is required.";
  }
  if (!input.category || !isValidCategory(input.category)) {
    errors.category = "Pick a valid category.";
  }
  if (typeof input.latitude !== "number" || !isValidLatitude(input.latitude)) {
    errors.latitude = "Latitude must be a number between -90 and 90.";
  }
  if (
    typeof input.longitude !== "number" ||
    !isValidLongitude(input.longitude)
  ) {
    errors.longitude = "Longitude must be a number between -180 and 180.";
  }
  if (!input.estimatedCost || input.estimatedCost.trim() === "") {
    errors.estimatedCost = "Estimated cost is required (write 'Free' if free).";
  }
  if (!input.description || input.description.trim() === "") {
    errors.description = "A short description is required.";
  }
  if (!input.localTip || input.localTip.trim() === "") {
    errors.localTip = "Add at least one local tip.";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export function parseCoordinate(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}
