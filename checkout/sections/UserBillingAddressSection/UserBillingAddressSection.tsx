import React, { Suspense } from "react";
import { useCheckoutFormValidationTrigger } from "../../hooks/useCheckoutFormValidationTrigger";
import { getById } from "../../lib/utils/common";
import { AddressSectionSkeleton } from "../../components/AddressSectionSkeleton";
import { UserAddressSectionContainer } from "../UserAddressSectionContainer";
import { useUserBillingAddressForm } from "./useUserBillingAddressForm";
import { AddressCreateForm } from "../AddressCreateForm/AddressCreateForm";
import { AddressEditForm } from "../AddressEditForm/AddressEditForm";
import { AddressList } from "../AddressList/AddressList";
import { Checkbox } from "../../components";
import { useCheckout } from "../../hooks/useCheckout";
import { FormProvider } from "../../hooks/useForm/FormProvider";
import { useBillingSameAsShippingForm } from "../GuestBillingAddressSection/useBillingSameAsShippingForm";
import { type OptionalAddress } from "../../components/AddressForm/types";
import { getByMatchingAddress } from "../../components/AddressForm/utils";
import { type AddressFragment } from "../../graphql";

interface UserBillingAddressSectionProps {}

export const UserBillingAddressSection: React.FC<UserBillingAddressSectionProps> = ({}) => {
	const {
		checkout: { isShippingRequired },
	} = useCheckout();

	const {
		form,
		userAddressActions: { onAddressCreateSuccess, onAddressDeleteSuccess, onAddressUpdateSuccess },
	} = useUserBillingAddressForm();

	const {
		resetForm,
		values: { addressList },
	} = form;

	const handleSetBillingSameAsShipping = (address: OptionalAddress) => {
		const matchingAddress = addressList.find(getByMatchingAddress(address));

		if (!address || !matchingAddress) {
			return;
		}

		resetForm({ values: { selectedAddressId: matchingAddress.id, addressList } });
	};

	const billingSameAsShippingForm = useBillingSameAsShippingForm({
		autoSave: false,
		onSetBillingSameAsShipping: handleSetBillingSameAsShipping,
	});

	useCheckoutFormValidationTrigger({
		scope: "billingAddress",
		form: billingSameAsShippingForm,
	});

	const {
		values: { billingSameAsShipping },
	} = billingSameAsShippingForm;

	return (
		<Suspense fallback={<AddressSectionSkeleton />}>
			{isShippingRequired && (
				<FormProvider form={billingSameAsShippingForm}>
					<Checkbox
						name="billingSameAsShipping"
						label="Use shipping address as billing address"
						data-testid={"useShippingAsBillingCheckbox"}
					/>
				</FormProvider>
			)}
			{!billingSameAsShipping && (
				<UserAddressSectionContainer>
					{({
						displayAddressCreate,
						displayAddressEdit,
						displayAddressList,
						setDisplayAddressCreate,
						setDisplayAddressEdit,
						editedAddressId,
					}) => (
						<>
							{displayAddressCreate && (
								<AddressCreateForm
									onClose={() => setDisplayAddressCreate(false)}
									onSuccess={onAddressCreateSuccess}
								/>
							)}

							{displayAddressEdit && (
								<AddressEditForm
									title="Billing address"
									onClose={() => setDisplayAddressEdit()}
									address={form.values.addressList.find(getById(editedAddressId)) as AddressFragment}
									onUpdate={onAddressUpdateSuccess}
									onDelete={onAddressDeleteSuccess}
								/>
							)}

							{displayAddressList && (
								<AddressList
									onEditChange={setDisplayAddressEdit}
									onAddAddressClick={() => setDisplayAddressCreate(true)}
									title="Billing address"
									form={form}
								/>
							)}
						</>
					)}
				</UserAddressSectionContainer>
			)}
		</Suspense>
	);
};
