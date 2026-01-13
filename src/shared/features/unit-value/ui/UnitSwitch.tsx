import { DEFAULT_UNIT } from "../model/constant";
import type { UnitType } from "../model/types";
import styles from "../styles/unitSwitch.module.css";

export function UnitSwitch(props: {
  value: UnitType;
  onChange: (u: UnitType) => void;
  label?: string;
  labelWidth?: number;
}) {
  const { value, onChange, label, labelWidth = 50 } = props;

  return (
    <div className={styles.wrapperSwitch}>
      {label && (
        <div
          className={styles.label}
          style={{ width: labelWidth, opacity: 0.8 }}
        >
          {label}
        </div>
      )}
      <div className={styles.wrapperUnit}>
        <button
          onClick={() => onChange(DEFAULT_UNIT)}
          className={`${styles.btn} ${
            value === DEFAULT_UNIT ? styles.active : ""
          }`}
        >
          {DEFAULT_UNIT}
        </button>
        <button
          onClick={() => onChange("px")}
          className={`${styles.btn} ${value === "px" ? styles.active : ""}`}
        >
          px
        </button>
      </div>
    </div>
  );
}
