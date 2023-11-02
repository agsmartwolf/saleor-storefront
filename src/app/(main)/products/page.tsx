import { notFound } from "next/navigation";
import { LanguageCodeEnum, ProductListPaginatedDocument } from "@/gql/graphql";
import { ProductsPerPage, executeGraphQL } from "@/lib/graphql";
import { Pagination } from "@/ui/components/Pagination";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
	title: "Products",
	description: "All products in Smart Wold dog store",
};

type Props = {
	searchParams: {
		cursor: string;
	};
};

export default async function Page({ searchParams }: Props) {
	const { cursor } = searchParams;

	const { products } = await executeGraphQL(ProductListPaginatedDocument, {
		variables: {
			first: ProductsPerPage,
			after: cursor,
			locale: LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	if (!products) {
		notFound();
	}

	return (
		<div>
			<section className="mx-auto max-w-7xl p-8 pb-16">
				<h2 className="sr-only">Product list</h2>
				<ProductList products={products.edges.map((e) => e.node)} />
				<Pagination pageInfo={products.pageInfo} />
			</section>
		</div>
	);
}
