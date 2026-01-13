import { useState } from "react";
import { DEFAULT_UNIT, DEFAULT_VALUES } from "../model/constant";
import { normalizeWhenSwitchToPercent } from "../model/normalize";
import type { FrameKey, UnitType } from "../model/types";
import { UnitSwitch } from "./UnitSwitch";
import { ValueStepper } from "./ValueStepper";
import styles from "../styles/unitValuePanel.module.css";

export function UnitValuePanel() {
  const [unit, setUnit] = useState<UnitType>(DEFAULT_UNIT);
  const [values, setValues] =
    useState<Record<FrameKey, number>>(DEFAULT_VALUES);

  const changeUnit = (next: UnitType) => {
    if (next === "%" && unit === "px") {
      setValues((prev) => {
        const copy = { ...prev };
        (Object.keys(copy) as FrameKey[]).forEach((k) => {
          copy[k] = normalizeWhenSwitchToPercent(copy[k]);
        });
        return copy;
      });
    }
    setUnit(next);
  };

  const setFrameValue = (key: FrameKey, v: number) => {
    setValues((prev) => ({ ...prev, [key]: v }));
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.title}>Unit value</div>
        <div className={styles.contentWrapper}>
          <UnitSwitch value={unit} onChange={changeUnit} label="Unit" />
          <ValueStepper
            label="Value"
            unit={unit}
            value={values.unit}
            step={0.1}
            onChange={(v) => setFrameValue("unit", v)}
          />
        </div>
      </div>
    </div>
  );
}
