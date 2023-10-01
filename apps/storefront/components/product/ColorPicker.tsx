import React, { useEffect, useMemo, useRef, useState } from "react";

import clsx from "clsx";

import styles from "./productStyles.module.css";
import { PRODUCT_COLOR_MAP } from "@/lib/product";
import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { Maybe } from "@/saleor/api";
import { AnimatedHorizontalScroller } from "@/components/AnimatedHorisontalScroller";

interface ColorPickerProps {
  colors: Array<{
    name?: string;
    active?: boolean;
    disabled?: boolean;
  }>;
  onColorChanged: (value: string) => void;
}

const COLOR_SIZE = 40;
const COLOR_GAP = 9;

export function ColorPicker({ colors, onColorChanged }: ColorPickerProps) {
  if (!colors) {
    return null;
  }

  function onOptionChanged(e: React.ChangeEvent<HTMLInputElement>) {
    onColorChanged(e.target.value);
  }

  return (
    <AnimatedHorizontalScroller itemWidth={COLOR_SIZE + COLOR_GAP}>
      {colors.map((c) => (
        <div>
          <input
            id={c.name}
            name={c.name}
            value={c.name}
            onChange={onOptionChanged}
            disabled={c.disabled}
            className="peer sr-only"
            type="radio"
            checked={c.active}
          />
          <label
            htmlFor={c.name}
            className={clsx(
              "border-[1px] p-[2.5px] w-10 h-10 min-w-10 cursor-pointer",
              { "border-black": c.active },
              { "border-gray-100": !c.active },
              { "opacity-20 strikethrough-diagonal cursor-not-allowed": c.disabled },
              { [styles.colorDisabled]: c.disabled },
            )}
          >
            <div
              className={clsx("w-full h-full", {
                [PRODUCT_COLOR_MAP.get(c?.name?.toLowerCase() ?? "")]: true,
              })}
            />
          </label>
        </div>
      ))}
    </AnimatedHorizontalScroller>
  );
}

export default ColorPicker;
