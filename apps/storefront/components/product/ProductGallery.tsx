import { useCallback, useEffect, useMemo, useState } from "react";
import useKeypress from "react-use-keypress";

import { ImageExpand } from "@/components/product/ImageExpand";
import { VideoExpand } from "@/components/product/VideoExpand";
import { getGalleryMedia } from "@/lib/media";
import { ProductVariantDetailsFragment } from "@/saleor/api";
import {
  ProductMediaFragmentBlurred,
  ProductWithBlurredMedia,
} from "../../pages/[channel]/[locale]/products/[slug]";
import Carousel from "@/components/Carousel";
import { images } from "next/dist/build/webpack/config/blocks/images";

export interface ProductGalleryProps {
  // product: ProductDetailsFragment;
  product: ProductWithBlurredMedia;
  selectedImageAttributeValue?: string;
}

export function ProductGallery({ product, selectedImageAttributeValue }: ProductGalleryProps) {
  const [expandedImage, setExpandedImage] = useState<ProductMediaFragmentBlurred | undefined>(
    undefined
  );
  const [videoToPlay, setVideoToPlay] = useState<ProductMediaFragmentBlurred | undefined>(
    undefined
  );

  const galleryMedia = getGalleryMedia({ product });

  const [currentImage, setCurrentImage] = useState<ProductMediaFragmentBlurred>(galleryMedia?.[0]);
  const [direction, setDirection] = useState(0);
  const [currentImgIndex, setCurrentImageInd] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useKeypress("Escape", () => {
    setExpandedImage(undefined);
  });

  const setCurrentImageCB = useCallback(
    (ind: number) => {
      if (ind > currentImgIndex) {
        setDirection(1);
      } else {
        setDirection(-1);
      }
      setCurrentImage(galleryMedia[ind]);
      setCurrentImageInd(ind);
    },
    [currentImage, galleryMedia, setCurrentImage]
  );

  useEffect(() => {
    const curVar = product.variants?.find((_var) =>
      _var.attributes.some((a) => a.values.some((v) => v.id === selectedImageAttributeValue))
    );
    if (curVar && curVar?.media?.[0]) {
      const ind = galleryMedia.findIndex((m) => m.url === curVar?.media?.[0]?.url);
      setCurrentImageCB(ind);
    }
  }, [product, selectedImageAttributeValue]);

  return (
    <>
      {expandedImage && (
        <div className="absolute min-h-screen min-w-screen h-full w-full top-0 bottom-0 left-0 right-0 z-40">
          <ImageExpand image={expandedImage} onRemoveExpand={() => setExpandedImage(undefined)} />
        </div>
      )}

      {videoToPlay && (
        <div className="absolute min-h-screen min-w-screen top-0 bottom-0 left-0 right-0 z-40">
          <VideoExpand video={videoToPlay} onRemoveExpand={() => setVideoToPlay(undefined)} />
        </div>
      )}
      <Carousel
        currentImg={currentImage}
        currentImgIndex={currentImgIndex}
        setCurrentImage={setCurrentImageCB}
        setVideoToPlay={setVideoToPlay}
        media={galleryMedia}
        direction={direction}
      />
    </>
  );
}
