import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { LanguageCodeEnum, ProductListByCategoryDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
	const { category } = await executeGraphQL(ProductListByCategoryDocument, {
		variables: {
			slug: params.slug,
			locale: LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	return {
		title: `${category?.seoTitle || category?.name || "Category"}`,
		description: category?.seoDescription || category?.description || category?.seoTitle || category?.name,
	};
};

export default async function Page({ params }: { params: { slug: string } }) {
	const { category } = await executeGraphQL(ProductListByCategoryDocument, {
		variables: {
			slug: params.slug,
			locale: LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	if (!category || !category.products) {
		notFound();
	}

	const { name, products } = category;

	return (
		<div className="mx-auto max-w-7xl p-3 pb-16 sm:p-8">
			<h1 className="pb-8 text-xl font-semibold">{name}</h1>
			<ProductList products={products.edges.map((e) => e.node)} />
		</div>
	);
}
