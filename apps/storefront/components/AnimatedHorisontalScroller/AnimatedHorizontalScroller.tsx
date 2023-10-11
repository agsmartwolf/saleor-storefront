import clsx from "clsx";
import React, { HTMLAttributes, ReactNode, useEffect, useMemo, useRef, useState } from "react";

import styles from "./AnimatedHorizontalScroller.module.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import {
  animate,
  useDragControls,
  useMotionValue,
  useMotionValueEvent,
  motion,
} from "framer-motion";

export interface AnimatedHorizontalScrollerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  itemWidth?: number;
  children: ReactNode[];
}

export const AnimatedHorizontalScroller: React.FC<AnimatedHorizontalScrollerProps> = ({
  className,
  itemWidth = 0,
  children = [],
  ...rest
}) => {
  const controls = useDragControls();
  const [largestItemWidth, setLargestItemWidth] = useState(itemWidth);

  const motionScrollerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const constraints = useMemo(() => {
    if (!motionScrollerRef.current) {
      return {
        left: -((children.length - 3 - 1) * largestItemWidth),
        right: (children.length - 3 - 1) * largestItemWidth,
        top: 0,
        bottom: 0,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const parentWidth =
      motionScrollerRef.current?.parentElement?.getBoundingClientRect()?.width ?? 0;

    const itemsOnScreen = Math.ceil(parentWidth / largestItemWidth);

    return {
      left: -((children.length - itemsOnScreen + 1) * largestItemWidth),
      right: (children.length - itemsOnScreen - 1) * largestItemWidth,
      top: 0,
      bottom: 0,
    };
  }, [largestItemWidth, motionScrollerRef.current]);

  const [isLeftControlVisible, setLeftControlVisible] = useState(false);
  const [isRightControlVisible, setRightControlVisible] = useState(false);

  useEffect(() => {
    if (motionScrollerRef.current) {
      const parentWidth =
        motionScrollerRef.current?.parentElement?.getBoundingClientRect().width ?? 0;
      const containerWidth = motionScrollerRef.current.getBoundingClientRect().width;
      if (containerWidth > parentWidth) {
        setRightControlVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    if (motionScrollerRef.current && motionScrollerRef.current.children?.length) {
      let maxWidth = Number.MIN_SAFE_INTEGER;
      [].forEach.call(motionScrollerRef.current.children, (c: HTMLDivElement) => {
        const w = c.clientWidth;
        if (w > maxWidth) {
          maxWidth = w;
        }
      });
      setLargestItemWidth(maxWidth);
    }
  }, [children]);

  useMotionValueEvent(x, "change", (_latest) => {
    if (_latest > -largestItemWidth / 2) {
      setLeftControlVisible(false);
      setRightControlVisible(true);
    } else {
      setLeftControlVisible(true);
    }

    if (motionScrollerRef.current) {
      const parentWidth =
        motionScrollerRef.current?.parentElement?.getBoundingClientRect().width ?? 0;
      const containerWidth = motionScrollerRef.current.getBoundingClientRect().width;
      if (
        // (_latest > -(containerWidth - parentWidth + COLOR_GAP))) {
        _latest > -(containerWidth - parentWidth)
      ) {
        setRightControlVisible(true);
      } else {
        setRightControlVisible(false);
      }
    }
  });
  return (
    <div className={clsx(styles.animatedHorisontalScroller, className)} {...rest}>
      <ArrowLeftIcon
        className={clsx("absolute h-6 w-6 -left-6 top-[calc(50%-14px)] z-10 cursor-pointer", {
          hidden: !isLeftControlVisible,
        })}
        onClick={() => {
          void animate(x, x.get() + largestItemWidth);
        }}
      />
      <ArrowRightIcon
        className={clsx("absolute h-6 w-6 -right-6 top-[calc(50%-14px)] z-10 cursor-pointer", {
          hidden: !isRightControlVisible,
        })}
        onClick={() => {
          void animate(x, x.get() - largestItemWidth);
        }}
      />
      <div className={clsx(styles.container, "overflow-hidden")}>
        <motion.div
          ref={motionScrollerRef}
          className="inline-flex gap-2"
          // className="flex w-full overflow-hidden gap-2"
          drag="x"
          dragControls={controls}
          dragConstraints={constraints}
          whileHover={{
            scale: 1.02,
            cursor: "grab",
            transition: { duration: 0.2 },
          }}
          dragElastic={0.5}
          whileTap={{ cursor: "grabbing" }}
          whileDrag={{ cursor: "grabbing" }}
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedHorizontalScroller;
