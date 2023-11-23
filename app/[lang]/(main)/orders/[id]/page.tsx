import { Box, Heading, Spacer, Text } from "@kuma-ui/core";
import { LanguageCodeEnum, OrderDocument } from "../../../../../gql/graphql";
import { executeGraphQL, formatMoney } from "../../../../../lib/graphql";
import { ProductElement } from "../../../../../ui/components/ProductElement";

export const metadata = {
	title: "Order",
	description: "Order details",
};

export default async function Page({ params }: { params: { id: string } }) {
	const data = await executeGraphQL(OrderDocument, {
		variables: {
			id: params.id,
			languageCode: LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	if (!data.order) throw Error("No order found");

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<Heading as="h1" mb={40} className="text-md">
				Order is successfully created!
			</Heading>
			<Box display="inline-block">
				<Heading as={"h2"} display="inline-block">
					Order №: <b>SW{data.order.number}</b>
				</Heading>
				<Text>
					Total cost: <b>{formatMoney(data.order.total.gross.amount, data.order.total.gross.currency)}</b>
				</Text>
				<Spacer horizontal height={1} width="100%" bg={"gray"} />
			</Box>
			<ul role="list" data-testid="ProductList" className="grid grid-cols-1 gap-8">
				{data.order.lines.map((line, index) => (
					<Box key={line.id} maxWidth={["100%", 320, 320]}>
						<ProductElement
							vertical={false}
							product={{
								id: line.id,
								slug: line.id,
								thumbnail: line.thumbnail,
								name: line.productName,
								pricing: {
									priceRange: {
										start: {
											...line.totalPrice,
										},
										stop: {
											...line.totalPrice,
										},
									},
								},
							}}
							priority={index === 0}
							loading={index < 3 ? "eager" : "lazy"}
						/>
					</Box>
				))}
			</ul>
		</section>
	);
}
