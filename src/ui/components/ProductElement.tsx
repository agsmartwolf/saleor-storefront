import Link from "next/link";
import { Box } from "@kuma-ui/core";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/graphql";

export function ProductElement({
	product,
	loading,
	priority,
	vertical = true,
}: { product: ProductListItemFragment; vertical?: boolean } & {
	loading: "eager" | "lazy";
	priority?: boolean;
}) {
	return (
		<li data-testid="ProductElement">
			<Link href={`/products/${product.slug}`} key={product.id}>
				<Box display={vertical ? "" : "flex"}>
					{product?.thumbnail?.url && (
						<ProductImageWrapper
							loading={loading}
							src={product.thumbnail.url}
							alt={product.thumbnail.alt ?? ""}
							width={512}
							height={512}
							priority={priority}
						/>
					)}
					<Box className={vertical ? "mt-2 flex justify-between" : "mt-2 flex-col justify-between"}>
						<div>
							<h3 className="mt-1 text-sm font-semibold text-neutral-900">{product.name}</h3>
							<p className="mt-1 text-sm text-neutral-500" data-testid="ProductElement_Category">
								{product.category?.name}
							</p>
						</div>
						<p className="mt-1 text-sm font-medium text-neutral-900" data-testid="ProductElement_PriceRange">
							{formatMoneyRange({
								start: product?.pricing?.priceRange?.start?.gross,
								stop: product?.pricing?.priceRange?.stop?.gross,
							})}
						</p>
					</Box>
				</Box>
			</Link>
		</li>
	);
}
