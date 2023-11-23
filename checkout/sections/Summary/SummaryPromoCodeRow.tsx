import React from "react";
import { SummaryMoneyRow, type SummaryMoneyRowProps } from "./SummaryMoneyRow";
import { IconButton } from "../../components/IconButton";
import { RemoveIcon } from "../../ui-kit/icons";
import { useCheckoutRemovePromoCodeMutation } from "../../graphql";
import { useCheckout } from "../../hooks/useCheckout";
import { isOrderConfirmationPage } from "../../lib/utils/url";

interface SummaryPromoCodeRowProps extends SummaryMoneyRowProps {
	promoCode?: string;
	promoCodeId?: string;
	editable: boolean;
}

export const SummaryPromoCodeRow: React.FC<SummaryPromoCodeRowProps> = ({
	promoCode,
	promoCodeId,
	editable,
	...rest
}) => {
	const { checkout } = useCheckout({ pause: isOrderConfirmationPage() });
	const [, checkoutRemovePromoCode] = useCheckoutRemovePromoCodeMutation();

	const onDelete = () => {
		const variables = promoCode ? { promoCode: promoCode } : { promoCodeId: promoCodeId as string };

		void checkoutRemovePromoCode({
			languageCode: "EN_US",
			checkoutId: checkout.id,
			...variables,
		});
	};

	return (
		<SummaryMoneyRow {...rest}>
			{editable && <IconButton onClick={onDelete} ariaLabel="remove promo code" icon={<RemoveIcon />} />}
		</SummaryMoneyRow>
	);
};
