import React, { useEffect, useMemo } from "react";
import { PaymentSectionSkeleton } from "@/checkout/sections/PaymentSection/PaymentSectionSkeleton";
import { useCheckoutUpdateState } from "@/checkout/state/updateStateStore";
import { Divider, SelectBox, SelectBoxGroup } from "@/checkout/components";
import { useForm } from "@/checkout/hooks/useForm";
import { useDebouncedSubmit } from "@/checkout/hooks/useDebouncedSubmit";
import { useFormSubmit } from "@/checkout/hooks/useFormSubmit";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { FormProvider } from "@/checkout/hooks/useForm/FormProvider";
import { executeGraphQL } from "@/lib/graphql";
import { CheckoutPaymentCreateDocument, CountryCode } from "@/gql/graphql";
import { Address, InputMaybe, useCheckoutBillingAddressUpdateMutation } from "@/checkout/graphql";

const PAYMENT_METHOD_META_FIELD_KEY = "payment_method_custom"
enum PaymentMethodsEnum {
	cash = 'cash',
	bankTransfer = 'bank_transfer'
}

const PAYMENT_METHODS = [
	{
		id: PaymentMethodsEnum.cash,
		label: 'Cash'
	},
	{
		id: PaymentMethodsEnum.bankTransfer,
		label: 'Bank Transfer'
	},
]

interface PaymentMethodsFormData {
	paymentMethodId: PaymentMethodsEnum | null;
}

export const PaymentMethods = () => {
	// const { availablePaymentGateways, fetching } = usePayments();
	const { checkout, loading } = useCheckout();
	const {
		changingBillingCountry,
		updateState: { checkoutDeliveryMethodUpdate },
	} = useCheckoutUpdateState();



	// const { adyen } = availablePaymentGateways;

	// const createPayment = async ({ checkoutId, paymentMethodId }: any) => {
	// 	return executeGraphQL(CheckoutPaymentCreateDocument, {
	// 		variables: {
	// 			amount: checkout.totalPrice.gross.amount,
	// 			checkoutId: checkoutId,
	// 			paymentGateway: "sw.saleor.checkout.app",
	// 			meta: [{
	// 				key: PAYMENT_METHOD_META_FIELD_KEY,
	// 				value: paymentMethodId
	// 			}]
	// 		},
	// 		cache: "no-cache"
	// 	})
	// }

	const [, checkoutBillingAddressUpdate] = useCheckoutBillingAddressUpdateMutation();

	const onSubmit = useFormSubmit<PaymentMethodsFormData, typeof checkoutBillingAddressUpdate>(
		useMemo(
			() => ({
				scope: "checkoutBillingUpdate",
				onSubmit: checkoutBillingAddressUpdate,
				shouldAbort: ({ formData: { paymentMethodId } }) =>
					!paymentMethodId,
				parse: ({ paymentMethodId, languageCode, checkoutId }) => ({
					languageCode,
					id: checkoutId,
					checkoutId: checkoutId,
					billingAddress: {
						...(({ id, __typename, ...o }) => o)(checkout.billingAddress as Address),
						country: (checkout.billingAddress?.country?.code ?? CountryCode.Ge) as InputMaybe<CountryCode>,
						metadata: [{
							key: PAYMENT_METHOD_META_FIELD_KEY,
							value: paymentMethodId
						}]
					}
				}),
				onError: ({ formData: { paymentMethodId }, formHelpers: { setValues } }) => {
					return setValues({ paymentMethodId });
				},
			}),
			[checkoutBillingAddressUpdate],
		),
	);

	const defaultFormData: PaymentMethodsFormData = {
		paymentMethodId: null,
	};

	const debouncedSubmit = useDebouncedSubmit(onSubmit);

	const form = useForm<PaymentMethodsFormData>({
		initialValues: defaultFormData,
		onSubmit: debouncedSubmit,
		initialDirty: true,
	});

	const {
		values: { paymentMethodId },
		handleSubmit,
	} = form;

	useEffect(() => {
		if (paymentMethodId) {
			handleSubmit();
		}
	}, [handleSubmit, paymentMethodId]);

	// delivery methods change total price so we want to wait until the change is done
	if (changingBillingCountry || loading || checkoutDeliveryMethodUpdate === "loading") {
		return <PaymentSectionSkeleton />;
	}

	// return <div className="mb-8">{adyen ? <AdyenDropIn config={adyen} /> : null}</div>;
	return <div className="mb-8">
		<FormProvider form={form}>
			<Divider />
			<SelectBoxGroup label="payment methods">
				{PAYMENT_METHODS.map(
					({id, label}) => (
						<SelectBox key={id} name="paymentMethodId" value={id}>
							<div className="min-h-12 pointer-events-none flex grow flex-col justify-center">
								<div className="flex flex-row items-center justify-between self-stretch">
									<p>{label}</p>
								</div>
							</div>
						</SelectBox>
					),
				)}
			</SelectBoxGroup>
		</FormProvider>
	</div>;
};
