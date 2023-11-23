import Link from "next/link";
import { Box } from "@kuma-ui/core";
import { Sora } from "next/font/google";

import clsx from "clsx";
import { ProductImageWrapper } from "../atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/graphql";

const sora = Sora({ subsets: ["latin"] });

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
		<Box
			as="li"
			data-testid="ProductElement"
			className="min-w-[170px] border-[1px] border-solid border-gray-100"
			_hover={{
				transform: "scale(1.1)",
			}}
		>
			<Link href={`/products/${product.slug}`} key={product.id}>
				<Box display={"flex"} flexDirection={vertical ? "column" : "row"} height="100%">
					<ProductImageWrapper
						loading={loading}
						src={product?.thumbnail?.url}
						alt={product?.thumbnail?.alt ?? ""}
						width={512}
						height={512}
						priority={priority}
					/>
					<Box
						className={clsx(sora.className, "flex-1 flex-shrink-0 flex-grow bg-gray-100 p-2 lg:p-4", {
							"mt-2 flex justify-between": !vertical,
							"mt-2 flex-col justify-between": vertical,
						})}
					>
						<div className="text-black-100">
							<h3 className={`mt-1 text-xs font-semibold sm:text-sm`}>{product.name}</h3>
							{/*<p
								className="mt-1 hidden text-xs font-light sm:inline-block sm:text-sm"
								data-testid="ProductElement_Category"
							>
								{product.category?.name}
							</p>*/}
						</div>
						<p
							className="mt-1 whitespace-nowrap text-xs font-semibold sm:text-sm"
							data-testid="ProductElement_PriceRange"
						>
							{formatMoneyRange({
								start: product?.pricing?.priceRange?.start?.gross,
								stop: product?.pricing?.priceRange?.stop?.gross,
							})}
						</p>
					</Box>
				</Box>
			</Link>
		</Box>
	);
}
