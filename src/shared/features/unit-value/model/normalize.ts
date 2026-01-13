import { clamp } from "../../../lib/number/clamp";
import { replaceCommaWithDot } from "../../../lib/number/sanitize";
import { parseLeadingNumber } from "../../../lib/number/parseLeadingNumber";
import { MAX_PERCENT, MIN_VALUE } from "./constant";
import type { UnitType } from "./types";

export function normalizeOnBlur(params: {
  raw: string;
  unit: UnitType;
  prev: number;
}): number {
  const cleaned = replaceCommaWithDot(params.raw.trim());

  if (!cleaned) return params.prev;

  const parsed = parseLeadingNumber(cleaned);

  if (parsed === null) return params.prev;

  if (parsed < 0) return MIN_VALUE;

  if (params.unit === "%") {
    if (parsed > MAX_PERCENT) return params.prev; 
    return clamp(parsed, MIN_VALUE, MAX_PERCENT);
  }

  return Math.max(MIN_VALUE, parsed);
}

export function normalizeByButtons(params: {
  next: number;
  unit: UnitType;
}): number {
  if (params.next < 0) return 0;

  if (params.unit === "%") {
    return clamp(params.next, 0, MAX_PERCENT);
  }
  return params.next;
}

export function normalizeWhenSwitchToPercent(value: number): number {
  return value > MAX_PERCENT ? MAX_PERCENT : value;
}

export function countDecimals(n: number) {
  if (Number.isInteger(n)) return 0;
  const s = String(n);
  return s.includes(".") ? s.split(".")[1].length : 0;
}

export function roundToStep(value: number, step: number) {
  const d = countDecimals(step);
  const factor = Math.pow(10, d);
  return Math.round(value * factor) / factor;
}
