import { PhotographIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { usePaths } from "@/lib/paths";
import { translate } from "@/lib/translations";
import { ProductCardFragment } from "@/saleor/api";

export interface ProductCardProps {
  product: ProductCardFragment;
}

const getCardSecondaryDescription = (product: ProductCardFragment) => {
  const artistAttribute = product.attributes.find(
    (attribute) => attribute.attribute.slug === "artist",
  );
  const mainValue = artistAttribute?.values[0];
  if (mainValue?.name) {
    return mainValue.name;
  }
  if (product.category) {
    return translate(product.category, "name");
  }
  return "";
};

export function ProductCard({ product }: ProductCardProps) {
  const paths = usePaths();
  const secondaryDescription = getCardSecondaryDescription(product);
  const thumbnailUrl = product.media?.find((media) => media.type === "IMAGE")?.url;

  const price = product.pricing?.priceRange?.start?.gross;

  return (
    <li
      key={product.id}
      className="w-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      <Link
        href={paths.products._slug(product.slug).$url()}
        prefetch={false}
        passHref
        legacyBehavior
      >
        <a href="pass" className="p-5 block">
          <div className="w-full aspect-1">
            <div className="bg-white w-full h-full relative object-contain flex justify-center items-center">
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  width={512}
                  height={512}
                  style={{ objectFit: "contain" }}
                  alt={product.name}
                />
              ) : (
                <div className="grid justify-items-center content-center h-full w-full">
                  <PhotographIcon className="h-10 w-10 content-center" />
                </div>
              )}
            </div>
          </div>
          <div className="">
            <p
              className="block mt-2 text-md font-extrabold text-main truncate"
              data-testid={`productName${product.name}`}
            >
              {translate(product, "name")}
            </p>
            <p
              className="block mt-2 text-md font-extrabold text-main truncate"
              data-testid={`productPrice${product.name}`}
            >
              {price?.amount}
              {price?.currency}
            </p>
            {secondaryDescription && (
              <p className="block text-md font-normal text-main underline">
                {secondaryDescription}
              </p>
            )}
          </div>
        </a>
      </Link>
    </li>
  );
}
