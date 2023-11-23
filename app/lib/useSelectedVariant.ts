"use client";

import { useSearchParams } from "next/navigation";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type Product, type ProductVariant } from "../../gql/graphql";
import { type AttributeOptionsVarSelectorType, getSelectedVariant } from "./products";

export const useSelectedVariant = ({
	product,
	attributes,
	initialSelectedVariant,
}: {
	product: Product;
	attributes: AttributeOptionsVarSelectorType;
	initialSelectedVariant?: ProductVariant;
}): [ProductVariant | undefined, Dispatch<SetStateAction<ProductVariant | undefined>>] => {
	const searchParams = useSearchParams();
	const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(initialSelectedVariant);

	useEffect(() => {
		const v = getSelectedVariant({
			product,
			searchParams,
			attributes,
		});
		setSelectedVariant(v);
	}, [searchParams]);

	return [selectedVariant, setSelectedVariant];
};
