import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { EmptyCartPage } from "../EmptyCartPage";
import { PageNotFound } from "../PageNotFound";
import { useUser } from "../../hooks/useUser";
import { PageHeader } from "../../sections/PageHeader";
import { Summary, SummarySkeleton } from "../../sections/Summary";
import { CheckoutForm, CheckoutFormSkeleton } from "../../sections/CheckoutForm";
import { useCheckout } from "../../hooks/useCheckout";
import { CheckoutSkeleton } from "./CheckoutSkeleton";
import { PAGE_ID } from "./consts";
import { useCheckoutComplete } from "../../hooks/useCheckoutComplete";
import { Button } from "../../components";

export const Checkout = () => {
	const { checkout, loading } = useCheckout();
	const { loading: isAuthenticating } = useUser();
	const { onCheckoutComplete, completingCheckout } = useCheckoutComplete();

	const isCheckoutInvalid = !loading && !checkout && !isAuthenticating;

	const isInitiallyAuthenticating = isAuthenticating && !checkout;

	const isEmptyCart = checkout && !checkout.lines.length;

	return isCheckoutInvalid ? (
		<PageNotFound />
	) : isInitiallyAuthenticating ? (
		<CheckoutSkeleton />
	) : (
		<ErrorBoundary FallbackComponent={PageNotFound}>
			<div className="page" id={PAGE_ID}>
				<PageHeader />
				<div className="grid min-h-screen grid-cols-1 gap-x-16 lg:grid-cols-2">
					{isEmptyCart ? (
						<EmptyCartPage />
					) : (
						<>
							<Suspense fallback={<CheckoutFormSkeleton />}>
								<CheckoutForm />
							</Suspense>
							<Suspense fallback={<SummarySkeleton />}>
								<Summary {...checkout} />
							</Suspense>
							<Button
								onClick={onCheckoutComplete}
								type="button"
								disabled={isCheckoutInvalid}
								ariaLabel={"Finish checkout"}
								label={"Finish checkout"}
							/>
						</>
					)}
				</div>
			</div>
		</ErrorBoundary>
	);
};
