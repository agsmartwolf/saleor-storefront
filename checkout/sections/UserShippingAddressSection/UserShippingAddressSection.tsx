import React, { Suspense } from "react";
import { getById } from "../../lib/utils/common";
import { AddressSectionSkeleton } from "../../components/AddressSectionSkeleton";
import { UserAddressSectionContainer } from "../UserAddressSectionContainer";
import { useUserShippingAddressForm } from "./useUserShippingAddressForm";
import { AddressCreateForm } from "../AddressCreateForm";
import { AddressEditForm } from "../AddressEditForm";
import { AddressList } from "../AddressList/AddressList";
import { type AddressFragment } from "../../graphql";
import { useCheckoutFormValidationTrigger } from "../../hooks/useCheckoutFormValidationTrigger";
import { useAvailableShippingCountries } from "../../hooks/useAvailableShippingCountries";

interface UserShippingAddressSectionProps {}

export const UserShippingAddressSection: React.FC<UserShippingAddressSectionProps> = ({}) => {
	const { availableShippingCountries } = useAvailableShippingCountries();
	const {
		form,
		userAddressActions: { onAddressCreateSuccess, onAddressDeleteSuccess, onAddressUpdateSuccess },
	} = useUserShippingAddressForm();

	useCheckoutFormValidationTrigger({
		scope: "shippingAddress",
		form: form,
	});

	return (
		<Suspense fallback={<AddressSectionSkeleton />}>
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
								availableCountries={availableShippingCountries}
								onClose={() => setDisplayAddressCreate(false)}
								onSuccess={onAddressCreateSuccess}
							/>
						)}

						{displayAddressEdit && (
							<AddressEditForm
								availableCountries={availableShippingCountries}
								title="Shipping address"
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
								title="Shipping address"
								checkAddressAvailability={true}
								form={form}
							/>
						)}
					</>
				)}
			</UserAddressSectionContainer>
		</Suspense>
	);
};
