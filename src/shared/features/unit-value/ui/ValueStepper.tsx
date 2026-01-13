import { useEffect, useMemo, useState } from "react";
import type { UnitType } from "../model/types";
import { DEFAULT_UNIT, MAX_PERCENT } from "../model/constant";
import {
  countDecimals,
  normalizeByButtons,
  normalizeOnBlur,
  roundToStep,
} from "../model/normalize";
import styles from "../styles/stepper.module.css";

export function ValueStepper(props: {
  unit: UnitType;
  value: number;
  step?: number;
  label?: string;
  labelWidth?: number;
  onChange: (v: number) => void;
}) {
  const { unit, value, onChange, label, labelWidth = 50 } = props;
  const step = props.step ?? 1;

  const [text, setText] = useState<string>(String(value));
  const [hoverTip, setHoverTip] = useState<string>("");
  const [tipAnchor, setTipAnchor] = useState<"minus" | "plus" | "input">(
    "input"
  );

  useEffect(() => {
    const d = countDecimals(step);
    setText(d > 0 ? value.toFixed(d) : String(value));
  }, [value, step]);

  const isPercent = unit === DEFAULT_UNIT;

  const isMinusDisabled = useMemo(() => value <= 0, [value]);

  const isPlusDisabled = useMemo(() => {
    if (isPercent) return value >= MAX_PERCENT;
    return false;
  }, [isPercent, value]);

  const dec = () => {
    if (isMinusDisabled) return;

    const raw = value - step;
    const fixed = roundToStep(raw, step);
    const next = normalizeByButtons({ next: fixed, unit });
    onChange(next);
  };

  const inc = () => {
    if (isPlusDisabled) return;

    const raw = value + step;
    const fixed = roundToStep(raw, step);
    const next = normalizeByButtons({ next: fixed, unit });
    onChange(next);
  };

  const onBlur = () => {
    const next = normalizeOnBlur({ raw: text, unit, prev: value });
    const cleaned = text.trim();
    if (cleaned) {
      const maybeNegative = cleaned.includes("-");

      if (maybeNegative && next === 0) {
        setTipAnchor("minus");
      } else if (isPercent && cleaned && next === value) {
        const num = Number(cleaned.replace(",", "."));
        if (!Number.isNaN(num) && num > MAX_PERCENT) {
          setTipAnchor("plus");
        } else {
          setHoverTip("");
        }
      } else {
        setHoverTip("");
      }
    } else {
      setHoverTip("");
    }
    onChange(next);
    const d = countDecimals(step);
    setText(d > 0 ? next.toFixed(d) : String(next));
  };

  const tooltipMessage = hoverTip;

  return (
    <div className={styles.fieldRow}>
      {label && (
        <div
          className={styles.label}
          style={{ width: labelWidth, opacity: 0.8 }}
        >
          {label}
        </div>
      )}
      <div className={styles.wrapper}>
        <div className={styles.stepper}>
          <span
            className={styles.btnWrap}
            onMouseEnter={() => {
              if (isMinusDisabled) {
                setTipAnchor("minus");
                setHoverTip("Value must greater than 0");
              }
            }}
            onMouseLeave={() => setHoverTip("")}
          >
            <button
              type="button"
              onClick={dec}
              disabled={isMinusDisabled}
              className={styles.btn}
            >
              –
            </button>
          </span>

          <input
            value={text}
            onChange={(e) => {
              setHoverTip("");
              setText(e.target.value);
            }}
            onBlur={onBlur}
            className={styles.input}
            inputMode="decimal"
          />
          <span
            className={styles.btnWrap}
            onMouseEnter={() => {
              if (isPlusDisabled) {
                setTipAnchor("plus");
                setHoverTip("Value must smaller than 100");
              }
            }}
            onMouseLeave={() => setHoverTip("")}
          >
            <button
              type="button"
              onClick={inc}
              disabled={isPlusDisabled}
              className={styles.btn}
            >
              +
            </button>
          </span>
        </div>

        {tooltipMessage && (
          <div
            className={[
              styles.tooltip,
              tipAnchor === "minus" ? styles.tipMinus : "",
              tipAnchor === "input" ? styles.tipInput : "",
              tipAnchor === "plus" ? styles.tipPlus : "",
            ].join(" ")}
          >
            {tooltipMessage}
          </div>
        )}
      </div>
    </div>
  );
}
