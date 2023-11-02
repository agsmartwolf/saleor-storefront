import clsx from "clsx";

import { Box } from "@kuma-ui/core";

import { AnimatedHorizontalScroller } from "@/ui/components/AnimatedHorizontalScroller";
import { PRODUCT_COLOR_MAP } from "@/app/lib/products";

interface ColorPickerProps {
  colors: Array<{
    id?: string;
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
   typeof window === 'undefined' ? null :
    <AnimatedHorizontalScroller itemWidth={COLOR_SIZE + COLOR_GAP}>
      {colors.map((c) => (
        <Box key={c.id}>
          <input
            id={c.name}
            name={c.name}
            value={c.id}
            onChange={onOptionChanged}
            disabled={c.disabled}
            className="peer sr-only"
            type="radio"
            checked={c.active}
          />
          <Box as='label'
               display='inline-block'
                htmlFor={c.name}
                p={'2.5px'}
                width={45}
                height={45}
                minWidth={45}
                cursor={'pointer'}
               borderWidth={1}
            className={clsx({
                "opacity-20 strikethrough-diagonal cursor-not-allowed": c.disabled,
              "border-gray-100": !c.active,
              "border-black-100": c.active,
              }
            )}
          >
            <div
              className={clsx("w-full h-full", {
                [PRODUCT_COLOR_MAP.get(c?.name?.toLowerCase() ?? "")]: true,
              })}
            />
          </Box>
        </Box>
      ))}
    </AnimatedHorizontalScroller>
  );
}

export default ColorPicker;
