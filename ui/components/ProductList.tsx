import { type ProductListItemFragment } from "../../gql/graphql";
import { ProductElement } from "./ProductElement";

export const ProductList = ({ products }: { products: readonly ProductListItemFragment[] }) => {
	return (
		<ul
			role="list"
			data-testid="ProductList"
			className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4"
		>
			{products.map((product, index) => (
				<ProductElement
					key={product.id}
					product={product}
					priority={index === 0}
					loading={index < 3 ? "eager" : "lazy"}
				/>
			))}
		</ul>
	);
};
