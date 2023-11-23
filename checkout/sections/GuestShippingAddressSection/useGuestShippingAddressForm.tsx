import { omit } from "lodash-es";
import { useMemo } from "react";
import { useCheckoutShippingAddressUpdateMutation } from "../../graphql";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import {
	getAddressFormDataFromAddress,
	getAddressInputData,
	getAddressValidationRulesVariables,
} from "../../components/AddressForm/utils";
import { useCheckoutFormValidationTrigger } from "../../hooks/useCheckoutFormValidationTrigger";
import { useCheckout } from "../../hooks/useCheckout";
import {
	type AutoSaveAddressFormData,
	useAutoSaveAddressForm,
} from "../../hooks/useAutoSaveAddressForm";
import { useSetCheckoutFormValidationState } from "../../hooks/useSetCheckoutFormValidationState";

export const useGuestShippingAddressForm = () => {
	const {
		checkout: { shippingAddress },
	} = useCheckout();

	const [, checkoutShippingAddressUpdate] = useCheckoutShippingAddressUpdateMutation();
	const { setCheckoutFormValidationState } = useSetCheckoutFormValidationState("shippingAddress");

	const onSubmit = useFormSubmit<AutoSaveAddressFormData, typeof checkoutShippingAddressUpdate>(
		useMemo(
			() => ({
				scope: "checkoutShippingUpdate",
				onSubmit: checkoutShippingAddressUpdate,
				parse: ({ languageCode, checkoutId, ...rest }) => ({
					languageCode,
					checkoutId,
					shippingAddress: getAddressInputData(omit(rest, "channel")),
					validationRules: getAddressValidationRulesVariables({ autoSave: true }),
				}),
				onSuccess: ({ data, formHelpers }) => {
					void setCheckoutFormValidationState({
						...formHelpers,
						values: getAddressFormDataFromAddress(data.checkout?.shippingAddress),
					});
				},
			}),
			[checkoutShippingAddressUpdate, setCheckoutFormValidationState],
		),
	);

	const form = useAutoSaveAddressForm({
		onSubmit,
		initialValues: getAddressFormDataFromAddress(shippingAddress),
		scope: "checkoutShippingUpdate",
	});

	useCheckoutFormValidationTrigger({
		form,
		scope: "shippingAddress",
	});

	return form;
};
