import edjsHTML from "editorjs-html";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import xss from "xss";
import * as Checkout from "../../../../../lib/checkout";
import { addBlurDataMedia } from "./addBlurDataMedia";
import { AddButton } from "./AddButton";
import { ProductGallery } from "@/ui/components/products/ProductGallery";
import { getAttributeOptionsForVariantSelector, getSelectedVariant } from "@/app/lib/products";
import { VariantSelector } from "@/ui/components/products/VariantSelector";
import { AvailabilityMessage } from "@/ui/components/AvailabilityMessage";
import {
	CheckoutAddLineDocument,
	LanguageCodeEnum,
	type Product,
	ProductDetailsDocument,
	ProductListDocument,
	type ProductMedia,
} from "@/gql/graphql";
import { executeGraphQL, formatMoney, formatMoneyRange } from "@/lib/graphql";
import getIntl from "@/app/[lang]/intl";

const shouldUseHttps =
	process.env.NEXT_PUBLIC_STOREFRONT_URL?.startsWith("https") || !!process.env.NEXT_PUBLIC_VERCEL_URL;

export async function generateMetadata({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { variant?: string };
}): Promise<Metadata> {
	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(params.slug),
			locale: LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}

	const productName = product.seoTitle || product.name;
	const variantName = product.variants?.find(({ id }) => id === searchParams.variant)?.name;

	const title = variantName ? `${productName} - ${variantName}` : productName;

	return {
		title: `${title}`,
		description: product.seoDescription || title,
		alternates: {
			canonical: process.env.NEXT_PUBLIC_STOREFRONT_URL
				? process.env.NEXT_PUBLIC_STOREFRONT_URL + `/products/${encodeURIComponent(params.slug)}`
				: undefined,
		},
	};
}

export async function generateStaticParams() {
	const { products } = await executeGraphQL(ProductListDocument, {
		revalidate: 60,
		variables: {
			first: 20,
			locale: LanguageCodeEnum.En,
		},
	});

	const paths = products?.edges.map(({ node: { slug } }) => ({ slug })) || [];
	return paths;
}

const parser = edjsHTML();

export default async function Page(props: {
	params: { slug: string; lang: string };
	searchParams: { [key: string]: string };
}) {
	const { params, searchParams } = props;
	const { lang } = params;
	const intl = await getIntl(lang, "common");
	const content = {
		addToBasket: intl.formatMessage({
			id: "addToBasket",
		}),
		processing: intl.formatMessage({
			id: "processing",
		}),
		stock: {
			inStock: intl.formatMessage({
				id: "inStock",
			}),
			outOfStock: intl.formatMessage({
				id: "outOfStock",
			}),
			selectVariant: intl.formatMessage({
				id: "selectVariant",
			}),
		},
	};
	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(params.slug),
			locale: LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	if (product?.media && typeof window === "undefined") {
		product.media = await addBlurDataMedia(product.media as ProductMedia[]);
	}

	const attributeOptions = getAttributeOptionsForVariantSelector(product as Product);

	if (!product) {
		notFound();
	}

	const firstImage = product.thumbnail;
	const description = product?.description ? parser.parse(JSON.parse(product?.description)) : null;

	const variants = product.variants;
	const selectedVariant = getSelectedVariant({
		product: product as Product,
		searchParams,
		attributes: attributeOptions,
	});
	const selectedVariantID = selectedVariant?.id;

	async function addItem() {
		"use server";

		let checkoutId = cookies().get("checkoutId")?.value;

		if (!checkoutId) {
			const { checkoutCreate } = await Checkout.create();

			if (checkoutCreate && checkoutCreate?.checkout?.id) {
				cookies().set("checkoutId", checkoutCreate.checkout?.id, {
					secure: shouldUseHttps,
					sameSite: "lax",
					httpOnly: true,
				});

				checkoutId = checkoutCreate.checkout.id;
			}
		}

		checkoutId = cookies().get("checkoutId")?.value;

		if (checkoutId && selectedVariantID) {
			const checkout = await Checkout.find(checkoutId);

			if (!checkout) {
				cookies().delete("checkoutId");
			}

			// TODO: error handling
			await executeGraphQL(CheckoutAddLineDocument, {
				variables: {
					id: checkoutId,
					productVariantId: decodeURIComponent(selectedVariantID),
					locale: LanguageCodeEnum.En,
				},
				cache: "no-cache",
			});

			revalidatePath("/cart");
		} else {
			throw new Error("Cart not found");
		}
	}

	const isAvailable = selectedVariant?.quantityAvailable ?? false;

	const price = selectedVariant?.pricing?.price?.gross
		? formatMoney(selectedVariant.pricing.price.gross.amount, selectedVariant.pricing.price.gross.currency)
		: isAvailable
		? formatMoneyRange({
				start: product?.pricing?.priceRange?.start?.gross,
				stop: product?.pricing?.priceRange?.stop?.gross,
		  })
		: "";

	return (
		<section className="mx-auto grid max-w-7xl p-8">
			<form className="grid gap-2 sm:grid-cols-2" action={addItem}>
				{firstImage && (
					// <ProductImageWrapper alt={firstImage.alt ?? ""} width={1024} height={1024} src={firstImage.url} />
					<ProductGallery product={product as Product} attributeOptions={attributeOptions} />
				)}
				<div className="flex flex-col pt-6 sm:px-6 sm:pt-0">
					<div>
						<h1 className="mb-4 flex-auto text-3xl font-bold tracking-tight text-neutral-900">
							{product?.name}
						</h1>
						{/*<p className="mb-8 text-sm font-medium text-neutral-900" data-testid="ProductElement_Price">*/}
						{/*	{price}*/}
						{/*</p>*/}

						{variants && (
							<VariantSelector
								initialSelectedVariant={selectedVariant}
								variants={variants}
								product={product as Product}
								attributeOptions={attributeOptions}
							/>
						)}
						<AvailabilityMessage
							isAvailable={!!isAvailable}
							selectedVariant={selectedVariant}
							content={content.stock}
						/>
						<div className="mt-2">
							<AddButton
								disabled={!selectedVariantID || !selectedVariant?.quantityAvailable}
								content={{
									addToBasket: content.addToBasket,
									processing: content.processing,
								}}
								price={price}
							/>
						</div>
						{description && (
							<div className="mt-8 space-y-6">
								{description.map((c) => (
									<div key={c} dangerouslySetInnerHTML={{ __html: xss(c) }} />
								))}
							</div>
						)}
					</div>
				</div>
			</form>
		</section>
	);
}
