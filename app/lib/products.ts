import { type ReadonlyURLSearchParams } from "next/navigation";
import { type ImageProps } from "next/image";
import { type Attribute, type AttributeValue, type Product, type ProductVariant } from "../../gql/graphql";
import { type MediaWithBlurData } from "../../ui/components/Carousel";

export const PRIMARY_ATTRIBUTE_FIELD = "isPrimaryAttribute";

export const PRODUCT_COLOR_MAP = new Map([
	["red", "bg-red-500"],
	["green", "bg-green-500"],
	["blue", "bg-blue-500"],
	["orange", "bg-orange-500"],
	["yellow", "bg-yellow-500"],
	["purple", "bg-purple-500"],
	["pink", "bg-pink-500"],
	["brown", "bg-amber-900"],
	["black", "bg-black-100"],
	["white", "bg-white-500"],
	["grey", "bg-gray-400"],

	["gray", "bg-gray-400"],

	["orange/black", "bg-gradient-to-r from-orange-500 to-black-100"],
	["army green", "bg-armygreen"],
	["vibrant orange", "bg-vibrantorange"],
	["pool blue", "bg-poolblue"],
	["ribbon red", "bg-ribbonred"],
	["orangeade", "bg-orangeade"],
	["baltic", "bg-baltic"],
	["neon yellow", "bg-neonyellow"],
	["fuchsia", "bg-fuchsia"],
	["royal blue", "bg-royalblue"],
	["grass green", "bg-grassgreen"],
	["funchsia", "bg-funchsia"],
	["grey/orange", "bg-gradient-to-r from-gray-400 to-orange-200"],
	["grey/yellow", "bg-gradient-to-r from-gray-400 to-yellow-200"],
	["grey/neon yellow", "bg-gradient-to-r from-gray-400 to-yellow-200"],
	["black/orange", "bg-gradient-to-r from-orange-500 to-black-100"],
	["black/neon yellow", "bg-gradient-to-r from-black-100 to-yellow-100"],
	["glacier gray", "bg-glaciergray"],
	["bright white", "bg-brightwhite"],
	["blue radiance", "bg-blueradiance"],
	["calypso coral", "bg-calypsocoral"],
	["blue topaz", "bg-bluetopaz"],
	["blazing yellow", "bg-blazingyellow"],
	["hot coral", "bg-hotcoral"],
	["black ink", "bg-blackink"],
	["turquoise", "bg-turquoise"],
	["rosso", "bg-rosso"],
	["carrot", "bg-carrot"],
	["artic", "bg-[#86e7f6]"],
	["chocolate", "bg-chocolate"],
	["gold", "bg-gold"],
	["steel", "bg-steel"],
	["violet", "bg-violet"],
	["wine", "bg-wine"],
	["multicolor", "bg-gradient-to-r from-blue-400 via-yellow-300 to-red-500"],
	["gray/orange", "bg-[#808080]"],
	["beige", "bg-[#F5F5DC]"],
	["lime", "bg-[#00FF00]"],
	["green", "bg-[#008000]"],
	["natural", "bg-[#DEB887]"],
	["unicorn", "bg-[#FF6EFF]"],
	["black/grey", "bg-[#808080]"],
	["blue/grey", "bg-[#6699CC]"],
	["grey/pink", "bg-[#C0C0C0]"],
	["unicorn", "bg-gradient-to-r from-yellow-300 via-pink-300 to-[#86e7f6]"],
]);

export type AttributeOptionsVarSelectorType = ReturnType<typeof getAttributeOptionsForVariantSelector>;
export type AttributeValuesType = {
	attribute: Attribute;
	values: AttributeValue[];
};
export const getAttributeOptionsForVariantSelector = (product: Product | undefined | null) => {
	const attrs: {
		[key: string]: AttributeValuesType;
	} = {};
	if (!product) return attrs;

	product?.variants?.forEach((v) => {
		v.attributes.forEach((curAttr) => {
			if (curAttr.values.length) {
				if (!attrs[curAttr.attribute.id]) {
					attrs[curAttr.attribute.id] = {
						attribute: { ...curAttr.attribute } as unknown as Attribute,
						values: [...curAttr.values],
					};
				} else {
					curAttr.values.forEach((curV) => {
						if (attrs[curAttr.attribute.id].values.every((_v) => _v.id !== curV.id)) {
							attrs[curAttr.attribute.id].values.push(curV as unknown as AttributeValue);
						}
					});
				}
			}
		});
	});

	return attrs;
};

export const getPrimaryAttribute = (attributeOptions: AttributeOptionsVarSelectorType) => {
	const primAttrKey = Object.keys(attributeOptions).find(
		(k) => !!attributeOptions[k].attribute.metadata?.find((mf) => mf.key === PRIMARY_ATTRIBUTE_FIELD),
	);
	return primAttrKey ? attributeOptions[primAttrKey] : undefined;
};

export const getSelectedVariant = ({
	product,
	searchParams,
	attributes,
}: {
	product: Product;
	searchParams?: { [k: string]: string } | ReadonlyURLSearchParams;
	attributes: AttributeOptionsVarSelectorType;
}): ProductVariant | undefined => {
	// Check, if variant is already in the url
	const attrsKeys = Object.keys(attributes);
	const isAllRequiredAttributesInURL = attrsKeys.every(
		(k) =>
			!!(typeof searchParams?.get !== "undefined"
				? (searchParams as ReadonlyURLSearchParams).get(k)
				: (searchParams as Record<string, string>)?.[k]),
	);
	const curVar = product?.variants?.find((v) =>
		v.attributes
			.filter((a) => attrsKeys.includes(a.attribute.id))
			.every((a) => {
				const curAttrQueryVal =
					typeof searchParams?.get !== "undefined"
						? (searchParams as ReadonlyURLSearchParams).get(a.attribute.id)
						: (searchParams as Record<string, string>)?.[a.attribute.id];
				return !!a.values.find((val) => val.id === curAttrQueryVal);
			}),
	);
	if (isAllRequiredAttributesInURL && curVar) {
		// case, where url contain valid variant id
		return curVar;
	}
	if (product?.variants?.length === 1) {
		// case, where product has only one variant to choose from, so we pre-select it
		return product.variants[0];
	}
	// there are multiple variants and user has not chosen any
	return undefined;
};

export const mapSaleorProductMediaToCarousal = (m: MediaWithBlurData) => {
	return {
		...m,
		width: 1024,
		height: 1024,
		alt: m.alt,
		src: m.url,
	};
};
