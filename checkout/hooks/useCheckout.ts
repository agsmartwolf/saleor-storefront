import { useEffect, useMemo } from "react";

import { type Checkout, useCheckoutQuery } from "../graphql";
import { extractCheckoutIdFromUrl } from "../lib/utils/url";
import { useCheckoutUpdateStateActions } from "../state/updateStateStore";

export const useCheckout = ({ pause = false } = {}) => {
	const id = useMemo(() => extractCheckoutIdFromUrl(), []);
	const { setLoadingCheckout } = useCheckoutUpdateStateActions();

	const [{ data, fetching: loading, stale }, refetch] = useCheckoutQuery({
		variables: { id, languageCode: "EN_US" },
		pause: pause,
	});

	useEffect(() => setLoadingCheckout(loading || stale), [loading, setLoadingCheckout, stale]);

	return useMemo(
		() => ({ checkout: data?.checkout as Checkout, loading: loading || stale, refetch }),
		[data?.checkout, loading, refetch, stale],
	);
};
