import { notNullable } from "@/lib/util";
import { ProductVariantDetailsFragment } from "@/saleor/api";
import {
  ProductMediaFragmentBlurred,
  ProductWithBlurredMedia,
} from "../pages/[channel]/[locale]/products/[slug]";

/**
 * If a variant has been selected by the user and this variant has media, return only those items.
 * Otherwise, all product media are returned.
 * @param product  The product object
 * @param selectedVariant   The selected variant object
 */

export const getGalleryMedia = ({ product }: { product: ProductWithBlurredMedia }) => {
  // if (selectedVariant && selectedVariant.media?.length !== 0)
  //   return (selectedVariant.media?.filter(notNullable) || []) as ProductMediaFragmentBlurred[];
  return (product?.media?.filter(notNullable) || []) as ProductMediaFragmentBlurred[];
};

export const getYouTubeIDFromURL = (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : undefined;
};

export const getVideoThumbnail = (videoUrl: string) => {
  const videoId = getYouTubeIDFromURL(videoUrl);
  if (!videoId) {
    return null;
  }
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};
