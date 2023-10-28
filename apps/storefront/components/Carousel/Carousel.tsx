import Image from "next/image";
import ProductMediaThumbnails from "./ProductMediaThumbnails";
import { ProductMediaFragmentBlurred } from "../../pages/[channel]/[locale]/products/[slug]";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { animationVariants } from "@/lib/util";
import { PlayIcon } from "@heroicons/react/outline";
import { getVideoThumbnail } from "@/lib/media";
import { useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { useOnScreen } from "@/lib/useOnScreen";
import { useSwipeable } from "react-swipeable";

export default function Carousel({
  currentImg,
  currentImgIndex,
  setCurrentImage,
  setVideoToPlay,
  media,
  direction,
}: {
  currentImg: ProductMediaFragmentBlurred;
  media: ProductMediaFragmentBlurred[];
  currentImgIndex: number;
  direction: number;
  setCurrentImage: (ind: number) => void;
  setVideoToPlay: (v: ProductMediaFragmentBlurred) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const videoThumbnailUrl = getVideoThumbnail(currentImg?.url);

  const currentImageRef = useRef(null);
  const isCurrentImgVisible = useOnScreen(currentImageRef);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentImgIndex < media?.length - 1) {
        setCurrentImage(currentImgIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentImgIndex > 0) {
        setCurrentImage(currentImgIndex - 1);
      }
    },
    trackMouse: true,
  });

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-1 w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
        {...handlers}
      >
        <div className="flex w-full">
          <div className="w-full overflow-hidden">
            <div
              className="relative flex aspect-1 items-center justify-center"
              ref={currentImageRef}
            >
              {/* Buttons */}
              {loaded && (
                <>
                  {currentImgIndex > 0 && (
                    <button
                      className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none z-50"
                      style={{ transform: "translate3d(0, 0, 0)" }}
                      onClick={() => setCurrentImage(currentImgIndex - 1)}
                    >
                      <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                  )}
                  {currentImgIndex + 1 < media.length && (
                    <button
                      className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none z-50"
                      style={{ transform: "translate3d(0, 0, 0)" }}
                      onClick={() => setCurrentImage(currentImgIndex + 1)}
                    >
                      <ArrowRightIcon className="h-6 w-6" />
                    </button>
                  )}
                </>
              )}
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentImgIndex}
                  custom={direction}
                  variants={animationVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute"
                >
                  {currentImg.type === "VIDEO" && (
                    <div
                      role="button"
                      tabIndex={-2}
                      onClick={() => {
                        setVideoToPlay(currentImg);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setVideoToPlay(currentImg);
                        }
                      }}
                    >
                      {videoThumbnailUrl && (
                        <Image
                          src={videoThumbnailUrl}
                          alt={currentImg.alt}
                          layout="fill"
                          objectFit="cover"
                        />
                      )}
                      <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 absolute w-full h-full flex justify-center items-center bg-transparent">
                        <PlayIcon className="h-12 w-12" />
                      </div>
                    </div>
                  )}
                  {currentImg.type === "IMAGE" && (
                    <Image
                      src={currentImg?.url}
                      placeholder="blur"
                      blurDataURL={currentImg.blurDataUrl}
                      width={1920}
                      height={1280}
                      priority
                      alt="Next.js Conf image"
                      onLoadingComplete={() => setLoaded(true)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <ProductMediaThumbnails
            images={media}
            currentImageIndex={currentImgIndex}
            currentPhoto={currentImg}
            setCurrentImage={setCurrentImage}
            setVideoToPlay={setVideoToPlay}
            loaded={loaded}
            hide={!isCurrentImgVisible}
          />
        </div>
      </div>
    </MotionConfig>
  );
}
