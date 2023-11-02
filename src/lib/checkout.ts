import { CheckoutCreateDocument, CheckoutFindDocument, LanguageCodeEnum } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function find(checkoutId: string) {
	const { checkout } = checkoutId
		? await executeGraphQL(CheckoutFindDocument, {
				variables: {
					id: checkoutId,
					locale: LanguageCodeEnum.En
				},
				cache: "no-cache",
		  })
		: { checkout: null };

	return checkout;
}

export const create = () => executeGraphQL(CheckoutCreateDocument, { cache: "no-cache" });
