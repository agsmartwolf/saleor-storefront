/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { type AddressFormData } from "../../components/AddressForm/types";
import { AddressForm, type AddressFormProps } from "../../components/AddressForm";
import {
	type AddressFragment,
	type CountryCode,
	useUserAddressDeleteMutation,
	useUserAddressUpdateMutation,
} from "../../graphql";
import { FormProvider } from "../../hooks/useForm/FormProvider";
import { getAddressFormDataFromAddress, getAddressInputData } from "../../components/AddressForm/utils";
import { type ChangeHandler, useForm } from "../../hooks/useForm";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { AddressFormActions } from "../../components/ManualSaveAddressForm";
import { useAddressFormSchema } from "../../components/AddressForm/useAddressFormSchema";
import { useSubmit } from "../../hooks/useSubmit/useSubmit";

export interface AddressEditFormProps extends Pick<AddressFormProps, "title" | "availableCountries"> {
	address: AddressFragment;
	onUpdate: (address: AddressFragment) => void;
	onDelete: (id: string) => void;
	onClose: () => void;
}

export const AddressEditForm: React.FC<AddressEditFormProps> = ({
	onUpdate,
	onClose,
	onDelete,
	address,
	availableCountries,
}) => {
	const [{ fetching: updating }, userAddressUpdate] = useUserAddressUpdateMutation();
	const [{ fetching: deleting }, userAddressDelete] = useUserAddressDeleteMutation();
	const { setCountryCode, validationSchema } = useAddressFormSchema();

	const onSubmit = useFormSubmit<AddressFormData, typeof userAddressUpdate>({
		scope: "userAddressUpdate",
		onSubmit: userAddressUpdate,
		parse: (formData) => ({ id: address.id, address: { ...getAddressInputData(formData) } }),
		onSuccess: ({ data: { address } }) => {
			if (address) {
				onUpdate(address);
			}
			onClose();
		},
	});

	const onAddressDelete = useSubmit<{ id: string }, typeof userAddressDelete>({
		scope: "userAddressDelete",
		onSubmit: userAddressDelete,
		parse: ({ id }) => ({ id }),
		onSuccess: ({ formData: { id } }) => {
			onDelete(id);
			onClose();
		},
	});

	const form = useForm<AddressFormData>({
		validationSchema,
		initialValues: getAddressFormDataFromAddress(address),
		onSubmit,
	});

	const { handleSubmit, handleChange } = form;

	const onChange: ChangeHandler = (event) => {
		const { name, value } = event.target;

		if (name === "countryCode") {
			setCountryCode(value as CountryCode);
		}

		handleChange(event);
	};

	return (
		<FormProvider form={{ ...form, handleChange: onChange }}>
			<AddressForm title="Edit address" availableCountries={availableCountries}>
				<AddressFormActions
					onSubmit={handleSubmit}
					loading={updating || deleting}
					onCancel={onClose}
					onDelete={() => onAddressDelete({ id: address.id })}
				/>
			</AddressForm>
		</FormProvider>
	);
};
