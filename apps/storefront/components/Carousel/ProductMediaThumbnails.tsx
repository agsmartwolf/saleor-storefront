import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { ProductMediaFragment } from "@/saleor/api";
import { ProductMediaFragmentBlurred } from "../../pages/[channel]/[locale]/products/[slug]";
import clsx from "clsx";

interface ProductMediaThumbnailsProps {
  currentImageIndex: number;
  images: ProductMediaFragmentBlurred[];
  currentPhoto: ProductMediaFragmentBlurred;
  setCurrentImage: (ind: number) => void;
  setVideoToPlay: (v: ProductMediaFragmentBlurred) => void;
  loaded: boolean;
  direction?: number;
  hide: boolean;
}

export const range = (start: number, end: number) => {
  const output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += 1) {
    output.push(i);
  }
  return output;
};

export default function ProductMediaThumbnails({
  setCurrentImage,
  setVideoToPlay,
  currentImageIndex,
  images,
  currentPhoto,
  loaded,
  hide,
}: ProductMediaThumbnailsProps) {
  const filteredImages = images?.filter((img: ProductMediaFragment, ind) =>
    range(currentImageIndex - 15, currentImageIndex + 15).includes(ind),
  );

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className={clsx(
          "absolute inset-0 mx-auto flex max-w-7xl items-center justify-center transition",
        )}
      >
        {/* Bottom Nav bar */}
        <div
          className={clsx(
            "fixed transition inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60",
            {
              "translate-y-36": hide,
            },
          )}
        >
          <motion.div initial={false} className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14">
            <AnimatePresence initial={false}>
              {filteredImages.map((img, ind) => (
                <motion.button
                  initial={{
                    width: "0%",
                    x: `${Math.max((currentImageIndex - 1) * -100, 15 * -100)}%`,
                  }}
                  animate={{
                    scale: ind === currentImageIndex ? 1.25 : 1,
                    width: "100%",
                    x: `${Math.max(currentImageIndex * -100, 15 * -100)}%`,
                  }}
                  exit={{ width: "0%" }}
                  onClick={() => setCurrentImage(ind)}
                  key={img.url}
                  className={`${
                    ind === currentImageIndex ? "z-20 rounded-md shadow shadow-black/50" : "z-10"
                  } ${ind === 0 ? "rounded-l-md" : ""} ${
                    ind === images.length - 1 ? "rounded-r-md" : ""
                  } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                >
                  <Image
                    alt="small photos on the bottom"
                    width={180}
                    height={120}
                    className={`${
                      ind === currentImageIndex
                        ? "brightness-110 hover:brightness-110"
                        : "brightness-50 contrast-125 hover:brightness-75"
                    } h-full transform object-cover transition`}
                    src={img.url}
                  />
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
