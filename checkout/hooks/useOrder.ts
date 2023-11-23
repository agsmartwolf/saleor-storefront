import { type OrderFragment, useOrderQuery } from "../graphql";
import { getQueryParams } from "../lib/utils/url";

export const useOrder = () => {
	const { orderId } = getQueryParams();

	const [{ data, fetching: loading }] = useOrderQuery({
		pause: !orderId,
		variables: { languageCode: "EN_US", id: orderId as string },
	});

	return { order: data?.order as OrderFragment, loading };
};
