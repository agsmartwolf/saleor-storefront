import { Suspense } from "react";
import { Checkout, CheckoutSkeleton } from "./Checkout";
import { OrderConfirmation, OrderConfirmationSkeleton } from "./OrderConfirmation";
import { getQueryParams } from "../lib/utils/url";
import { PaymentProcessingScreen } from "../sections/PaymentSection/PaymentProcessingScreen";

export const RootViews = () => {
	const orderId = getQueryParams().orderId;

	if (orderId) {
		return (
			<Suspense fallback={<OrderConfirmationSkeleton />}>
				<OrderConfirmation />
			</Suspense>
		);
	}

	return (
		<PaymentProcessingScreen>
			<Suspense fallback={<CheckoutSkeleton />}>
				<Checkout />
			</Suspense>
		</PaymentProcessingScreen>
	);
};
