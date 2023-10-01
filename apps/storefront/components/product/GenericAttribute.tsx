import { ProductVariantDetailsFragment, SelectedAttribute } from "@/saleor/api";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { translate } from "@/lib/translations";
import React from "react";
import { useRegions } from "@/components/RegionsProvider";
import ColorPicker from "@/components/product/ColorPicker";
import { notNullable } from "@/lib/util";
import { AnimatedHorizontalScroller } from "@/components/AnimatedHorisontalScroller";

export type GenericAttributeProps = {
  attribute: SelectedAttribute;
  selectedVariant?: ProductVariantDetailsFragment;
  onChange: (value: string) => void;
};

export enum AttributeSlug {
  color = "color",
  sizeNumbers = "size-numbers",
  sizeSml = "size-sml",
}

export const GenericAttribute = ({
  attribute,
  selectedVariant,
  onChange,
}: GenericAttributeProps) => {
  // const { formatPrice } = useRegions();

  switch (attribute.attribute.slug) {
    case AttributeSlug.color: {
      return (
        <ColorPicker
          colors={attribute.values
            .filter((v) => notNullable(v.name))
            .map((v) => ({
              name: v.name,
              active: selectedVariant?.attributes
                ?.find((a) => attribute.attribute.id === a.attribute.id)
                ?.values.some((av) => av.id === v.id),
              // disabled:
            }))}
          onColorChanged={onChange}
        />
      );
    }
    case AttributeSlug.sizeSml: {
      return (
        <AnimatedHorizontalScroller>
          {attribute.values.map((v) => (
            <RadioGroup.Option
              key={v.id}
              value={v.id}
              className={({ checked }) => clsx("", checked && "bg-brand", !checked && "bg-white")}
            >
              {({ checked }) => (
                <div
                  className={clsx(
                    "inline-flex relative cursor-pointer object-contain border-[1px]",
                    checked && "border-brand",
                    !checked && "hover:border-main border-main-2",
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
