import {
  ProductDetailsFragment,
  ProductVariantDetailsFragment,
  SelectedAttribute,
} from "@/saleor/api";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { translate } from "@/lib/translations";
import React, { useMemo } from "react";
import { useRegions } from "@/components/RegionsProvider";
import ColorPicker from "@/components/product/ColorPicker";
import { notNullable } from "@/lib/util";
import { AnimatedHorizontalScroller } from "@/components/AnimatedHorisontalScroller";
import { useRouter } from "next/router";
import { getAttributeOptionsForVariantSelector } from "@/lib/product";

export type GenericAttributeProps = {
  attribute: SelectedAttribute;
  selectedVariant?: ProductVariantDetailsFragment;
  // variants which contain current AND primary attribute
  product?: ProductDetailsFragment;
  primaryAttribute: ReturnType<typeof getAttributeOptionsForVariantSelector>;
  onChange: (value: string) => void;
};

export enum AttributeSlug {
  color = "color",
  sizeNumbers = "size-numbers",
  sizeSml = "size-sml",
}

export const GenericAttribute = ({
  product,
  primaryAttribute,
  attribute,
  selectedVariant,
  onChange,
}: GenericAttributeProps) => {
  // const { formatPrice } = useRegions();
  const router = useRouter();

  switch (attribute.attribute.slug) {
    case AttributeSlug.color: {
      const colors = useMemo(() => {
        return attribute.values
          .filter((v) => notNullable(v.name))
          .map((v) => ({
            id: v.id,
            name: v.name,
            active:
              router.query[attribute.attribute.id] === v.id ||
              selectedVariant?.attributes
                ?.find((a) => attribute.attribute.id === a.attribute.id)
                ?.values.some((av) => av.id === v.id),
            // disabled:
          }));
      }, [selectedVariant, router.query]);
      return <ColorPicker colors={colors} onColorChanged={onChange} />;
    }
    case AttributeSlug.sizeSml: {
      return (
        <AnimatedHorizontalScroller>
          {attribute.values.map((v) => (
            <RadioGroup.Option
              key={v.id}
              value={v.id}
              className={({ checked }) =>
                clsx({
                  "bg-brand": checked,
                  "bg-white": !checked,
                  "text-gray-200 strikethrough-diagonal border-gray-200": !product?.variants
                    ?.filter((_var) =>
                      _var?.attributes.some(
                        (a) =>
                          a.attribute.id === primaryAttribute?.attribute?.id &&
                          a.values.some(
                            (_val) => _val.id === router.query[primaryAttribute?.attribute?.id]
                          )
                      )
                    )
                    .some((_av) =>
                      _av.attributes
                        .find((_a) => _a.attribute.id === attribute.attribute.id)
                        ?.values.some((_v) => _v.id === v.id)
                    ),
                })
              }
            >
              {({ checked }) => (
                <div
                  className={clsx(
                    "inline-flex relative cursor-pointer object-contain border-[1px]",
                    checked && "border-brand",
                    !checked && "hover:border-main border-main-2"
                  )}
                >
                  <RadioGroup.Label
                    as="div"
                    className="px-4 py-2.5 inline-flex font-semibold text-md whitespace-nowrap"
                    data-testid={`variantOf${v.name ?? ""}`}
                  >
                    {translate(v, "name")}
                    {/*<div>{formatPrice(variant.pricing?.price?.gross)}</div>*/}
                  </RadioGroup.Label>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </AnimatedHorizontalScroller>
      );
    }
    default:
      return null;
  }
};
