import { useEffect } from "react";
import { useCheckout } from "../../hooks/useCheckout";
import { useCheckoutComplete } from "../../hooks/useCheckoutComplete";
import { type PaymentStatus } from "./types";
import { usePaymentGatewaysInitialize } from "./usePaymentGatewaysInitialize";
import { usePaymentStatus } from "./utils";

const paidStatuses: PaymentStatus[] = ["overpaid", "paidInFull", "authorized"];

export const usePayments = () => {
	const { checkout } = useCheckout();
	const paymentStatus = usePaymentStatus(checkout);

	const { fetching, availablePaymentGateways } = usePaymentGatewaysInitialize();

	const { onCheckoutComplete, completingCheckout } = useCheckoutComplete();

	useEffect(() => {
		// the checkout was already paid earlier, complete
		if (!completingCheckout && paidStatuses.includes(paymentStatus)) {
			void onCheckoutComplete();
		}
	}, []);

	return { fetching, availablePaymentGateways };
};
