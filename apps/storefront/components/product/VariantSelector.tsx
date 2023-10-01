import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";

import { usePaths } from "@/lib/paths";
import { translate } from "@/lib/translations";
import { ProductDetailsFragment, ProductVariantDetailsFragment } from "@/saleor/api";

import { useRegions } from "../RegionsProvider";
import { notNullable } from "@/lib/util";
import { getAttributeOptionsForVariantSelector, getPrimaryAttribute } from "@/lib/product";
import { GenericAttribute } from "@/components/product/GenericAttribute";

export interface VariantSelectorProps {
  product: ProductDetailsFragment;
  selectedVariant?: ProductVariantDetailsFragment;
  attributeOptions: ReturnType<typeof getAttributeOptionsForVariantSelector>;
}

export function VariantSelector({
  product,
  selectedVariant,
  attributeOptions,
}: VariantSelectorProps) {
  const paths = usePaths();
  const router = useRouter();
  const { formatPrice } = useRegions();

  const { variants } = product;

  const primaryAttribute = useMemo(() => getPrimaryAttribute(attributeOptions), []);

  // Skip displaying selector when theres less than 2 variants
  if (!variants || variants.length === 1) {
    return null;
  }

  const onChange = useCallback(
    (value: string, attributeId: string) => {
      // setSelectedVariant(value);
      // TODO
      // attributeOptions
      void router.replace(
        paths.products._slug(product.slug).$url({
          ...(value && {
            query: {
              ...router.query,
              [attributeId]: value,
            },
          }),
        }),
        undefined,
        {
          shallow: true,
          scroll: false,
        }
      );
    },
    [attributeOptions, router.query, product.slug]
  );

  return (
    <div className="w-full">
      <div className="space-y-4">
        {primaryAttribute ? (
          <GenericAttribute
            attribute={primaryAttribute}
            selectedVariant={selectedVariant}
            onChange={(v) => onChange(v, primaryAttribute?.attribute.id)}
          />
        ) : null}
        {Object.keys(attributeOptions)
          .filter((ao) => ao !== primaryAttribute?.attribute.id)
          .map((k) => (
            <RadioGroup
              value={selectedVariant?.attributes.find((a) => a.attribute.id === k)?.values[0]?.id}
              onChange={(v) => onChange(v, attributeOptions[k].attribute.id)}
              name={attributeOptions[k].attribute.id}
            >
              <GenericAttribute
                attribute={attributeOptions[k]}
                selectedVariant={selectedVariant}
                onChange={(v) => onChange(v, k)}
              />
            </RadioGroup>
          ))}
      </div>
    </div>
  );
}

export default VariantSelector;
