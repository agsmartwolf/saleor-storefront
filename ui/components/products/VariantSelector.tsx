"use client";

import { useMemo } from "react";
import { useRouter, redirect, useSearchParams, type ReadonlyURLSearchParams } from "next/navigation";
import { RadioGroup } from "@headlessui/react";
import {
	type Product,
	type ProductListItemFragment,
	type ProductVariant,
	type VariantDetailsFragment,
} from "../../../gql/graphql";
import {
	type AttributeOptionsVarSelectorType,
	type AttributeValuesType,
	getPrimaryAttribute,
} from "../../../app/lib/products";
import { useSelectedVariant } from "../../../app/lib/useSelectedVariant";
import { GenericAttribute } from "./GenericAttribute";

export function VariantSelector({
	variants,
	product,
	initialSelectedVariant,
	attributeOptions,
}: {
	variants: readonly VariantDetailsFragment[];
	product: Product;
	initialSelectedVariant?: ProductVariant;
	attributeOptions: AttributeOptionsVarSelectorType;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const primaryAttribute = useMemo(() => getPrimaryAttribute(attributeOptions), [attributeOptions]);
	const [selectedVariant] = useSelectedVariant({
		product,
		attributes: attributeOptions,
		initialSelectedVariant,
	});

	if (!selectedVariant && variants.length === 1 && variants[0]?.quantityAvailable) {
		// TODO
		redirect(
			getHrefForVariant(
				product,
				variants[0].attributes.map((a) => a.attribute.id),
				variants[0].attributes.map((a) => a.values[0].value),
				primaryAttribute,
				searchParams,
			),
		);
	}

	const onChange = (value: string, attributeId: string) => {
		// setSelectedVariant(value);
		// TODO
		if (attributeId !== primaryAttribute?.attribute.id) {
			/* empty */
		}
		void router.replace(getHrefForVariant(product, [attributeId], [value], primaryAttribute, searchParams), {
			scroll: false,
		});
	};

	return (
		<div className="w-full">
			<div className="space-y-2">
				{primaryAttribute ? (
					<GenericAttribute
						attribute={primaryAttribute}
						selectedVariant={selectedVariant}
						onChange={(v) => onChange(v, primaryAttribute?.attribute.id)}
						primaryAttribute={primaryAttribute}
					/>
				) : null}
				{Object.keys(attributeOptions)
					.filter((ao) => ao !== primaryAttribute?.attribute.id)
					.map((k) => (
						<RadioGroup
							key={attributeOptions[k].attribute.id}
							value={selectedVariant?.attributes?.find((a) => a.attribute.id === k)?.values[0]?.id}
							onChange={(v) => onChange(v, attributeOptions[k].attribute.id)}
							name={attributeOptions[k].attribute.id}
						>
							<GenericAttribute
								product={product}
								primaryAttribute={primaryAttribute}
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

function getHrefForVariant(
	product: ProductListItemFragment,
	attributeIds: string[],
	values: (string | null | undefined)[],
	_primaryAttribute: AttributeValuesType | undefined,
	searchParams: ReadonlyURLSearchParams,
): string {
	const pathname = `/products/${encodeURIComponent(product.slug)}`;
	const queryEntries = searchParams.entries();
	const queryObject: Record<string, string> = {};
	for (const [key, value] of queryEntries) {
		queryObject[key] = value;
	}

	let finalQueryObject: Record<string, string> = {};

	// if (!attributeIds.some(attributeId => attributeId === primaryAttribute?.attribute?.id)) {
	//
	// }

	finalQueryObject = { ...queryObject };

	attributeIds.forEach((attributeId, _ind) => {
		if (attributeId && typeof values[_ind] !== "undefined" && values[_ind] !== null) {
			finalQueryObject[attributeId] = values[_ind] as string;
		}
	});
	const query = new URLSearchParams(finalQueryObject);
	return `${pathname}?${query.toString()}`;
}
