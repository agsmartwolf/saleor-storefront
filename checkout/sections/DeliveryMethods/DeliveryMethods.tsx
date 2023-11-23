import React from "react";
import { Title } from "../../components/Title";
import { useCheckout } from "../../hooks/useCheckout";
import { SelectBox } from "../../components/SelectBox";
import { SelectBoxGroup } from "../../components/SelectBoxGroup";
import { getFormattedMoney } from "../../lib/utils/money";
import { Divider } from "../../components/Divider";
import { type CommonSectionProps } from "../../lib/globalTypes";
import { useDeliveryMethodsForm } from "./useDeliveryMethodsForm";
import { FormProvider } from "../../hooks/useForm/FormProvider";
import { useCheckoutUpdateState } from "../../state/updateStateStore";
import { DeliveryMethodsSkeleton } from "./DeliveryMethodsSkeleton";
import { useUser } from "../../hooks/useUser";

export const DeliveryMethods: React.FC<CommonSectionProps> = ({ collapsed }) => {
	const { checkout } = useCheckout();
	const { authenticated } = useUser();
	const { shippingMethods, shippingAddress } = checkout;
	const form = useDeliveryMethodsForm();
	const { updateState } = useCheckoutUpdateState();

	const getSubtitle = ({ min, max }: { min?: number | null; max?: number | null }) => {
		if (!min || !max) {
			return undefined;
		}

		return `${min}-${max} business days`;
	};

	if (!checkout?.isShippingRequired || collapsed) {
		return null;
	}

	return (
		<FormProvider form={form}>
			<Divider />
			<div className="py-6" data-testid="deliveryMethods">
				<Title className="mb-2">Delivery methods</Title>
				{!authenticated && !shippingAddress && (
					<p>Please fill in shipping address to see available shipping methods</p>
				)}
				{authenticated && !shippingAddress && updateState.checkoutShippingUpdate ? (
					<DeliveryMethodsSkeleton />
				) : (
					<SelectBoxGroup label="delivery methods">
						{shippingMethods?.map(
							({ id, name, price, minimumDeliveryDays: min, maximumDeliveryDays: max }) => (
								<SelectBox key={id} name="selectedMethodId" value={id}>
									<div className="min-h-12 pointer-events-none flex grow flex-col justify-center">
										<div className="flex flex-row items-center justify-between self-stretch">
											<p>{name}</p>
											<p>{getFormattedMoney(price)}</p>
										</div>
										<p className="font-xs" color="secondary">
											{getSubtitle({ min, max })}
										</p>
									</div>
								</SelectBox>
							),
						)}
					</SelectBoxGroup>
				)}
			</div>
		</FormProvider>
	);
};
