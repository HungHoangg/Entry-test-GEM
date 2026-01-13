import type { FrameKey, UnitType } from "./types";

export const UNIT_OPTIONS: UnitType[] = ["%", "px"];

export const MIN_VALUE = 0;
export const MAX_PERCENT = 100;

export const DEFAULT_UNIT: UnitType = "%";

export const DEFAULT_VALUES: Record<FrameKey, number> = {
  unit: 1,
};
