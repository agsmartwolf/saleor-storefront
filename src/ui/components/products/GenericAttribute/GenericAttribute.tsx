"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { isNull } from "lodash-es";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { type Product, type ProductVariant, type SelectedAttribute } from "@/gql/graphql";
import { type AttributeValuesType } from "@/app/lib/products";
import ColorPicker from "@/ui/components/products/ColorPicker";
import { AnimatedHorizontalScroller } from "@/ui/components/AnimatedHorizontalScroller";
import { translate } from "@/app/lib/translations";

export type GenericAttributeProps = {
  attribute: SelectedAttribute;
  selectedVariant?: ProductVariant;
  // variants which contain current AND primary attribute
  product?: Product;
  primaryAttribute: AttributeValuesType;
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
  const searchParams = useSearchParams();

  switch (attribute.attribute.slug) {
    case AttributeSlug.color: {
      return (
        <ColorPickerWrapper
          primaryAttribute={primaryAttribute}
          attribute={attribute}
          selectedVariant={selectedVariant}
          onChange={onChange}
      />)
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
                            (_val) => _val.id === searchParams.get(primaryAttribute?.attribute.id)
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
                    className="px-4 py-1 inline-flex font-semibold text-sm whitespace-nowrap"
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

const ColorPickerWrapper = ({attribute, selectedVariant, onChange }: GenericAttributeProps) => {
  const searchParams = useSearchParams();
  const colors = useMemo(() => {
    return attribute.values
      .filter((v) => !isNull(v.name))
      .map((v) => ({
        id: v.id,
        name: v.name as string | undefined,
        active:
          Boolean((searchParams.get(attribute.attribute.id) === v.id ||
          selectedVariant?.attributes
            ?.find((a) => attribute.attribute.id === a.attribute.id)
            ?.values.some((av) => av.id === v.id))),
        disabled: false
      }));
  }, [selectedVariant, searchParams, attribute.attribute.id]);
  return <ColorPicker colors={colors} onColorChanged={onChange} />;
}
