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
		endCursor: string;
		startCursor: string;
	};
};

export default async function Page({ searchParams }: Props) {
	const { endCursor, startCursor } = searchParams;
	const variables: {
		first?: number;
		last?: number;
		locale: LanguageCodeEnum;
		after?: string;
		before?: string;
	} = {
		locale: LanguageCodeEnum.En,
	};

	if (endCursor) {
		variables.after = endCursor;
		variables.first = ProductsPerPage;
	} else if (startCursor) {
		variables.before = startCursor;
		variables.last = ProductsPerPage;
	} else {
		variables.after = startCursor;
		variables.first = ProductsPerPage;
	}

	const { products } = await executeGraphQL(ProductListPaginatedDocument, {
		variables,
		revalidate: 60,
	});

	if (!products) {
		notFound();
	}

	return (
		<div>
			<section className="mx-auto max-w-7xl p-2 pb-16 sm:p-8">
				<h2 className="sr-only">Product list</h2>
				<ProductList products={products.edges.map((e) => e.node)} />
				<Pagination pageInfo={products.pageInfo} />
			</section>
		</div>
	);
}
