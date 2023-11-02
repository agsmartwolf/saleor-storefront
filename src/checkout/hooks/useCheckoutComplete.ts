import { useMemo } from "react";
import { Address, useCheckoutCompleteMutation } from "@/checkout/graphql";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { useSubmit } from "@/checkout/hooks/useSubmit";
import { replaceUrl } from "@/checkout/lib/utils/url";

export const useCheckoutComplete = () => {
	const {
		checkout: { id: checkoutId, billingAddress },
	} = useCheckout();
	const [{ fetching }, checkoutComplete] = useCheckoutCompleteMutation();

	const billingMetadata = billingAddress?.metadata.map((m) => ({ ...(({ __typename, ...r }) => r)(m) }));

	const onCheckoutComplete = useSubmit<{}, typeof checkoutComplete>(
		useMemo(
			() => ({
				parse: () => ({
					checkoutId,
					metadata: billingMetadata,
				}),
				onSubmit: checkoutComplete,
				onSuccess: ({ data }) => {
					const order = data.order;

					if (order) {
						const newUrl = replaceUrl({ query: { checkout: undefined, order: order.id } });
						window.location.href = newUrl;
					}
				},
			}),
			[checkoutComplete, checkoutId, billingMetadata],
		),
	);
	return { completingCheckout: fetching, onCheckoutComplete };
};
