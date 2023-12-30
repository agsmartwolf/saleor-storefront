import { Suspense } from "react";

import { type PrimitiveType, useIntl } from "react-intl";
import { PageHeader } from "../../sections/PageHeader";
import { Summary, SummarySkeleton } from "../../sections/Summary";
import { OrderInfo } from "../../sections/OrderInfo";
import { useOrder } from "../../hooks/useOrder";

export const OrderConfirmation = () => {
	const { order } = useOrder();

	const { formatMessage } = useIntl();

	const content = {
		header: formatMessage(
			{
				id: "orderConfirmation.header",
			},
			{ orderNumber: order.number },
		),
		subtitle: formatMessage({
			id: "orderConfirmation.subtitle",
		}),
	};

	return (
		<main className="grid grid-cols-1 gap-x-16 lg:grid-cols-2">
			<div>
				<header>
					<PageHeader />
					<p className="mb-2 text-lg font-bold" data-testid="orderConfirmationTitle">
						{content.header}
					</p>
					<p className="text-base">
						{content.subtitle} <b>{order.userEmail}</b>.
					</p>
				</header>
				<OrderInfo />
			</div>
			<Suspense fallback={<SummarySkeleton />}>
				<Summary
					{...order}
					// for now there can only be one voucher per order in the api
					discount={order?.discounts?.find(({ type }) => type === "VOUCHER")?.amount}
					voucherCode={order?.voucher?.code}
					totalPrice={order?.total}
					subtotalPrice={order?.subtotal}
					editable={false}
				/>
			</Suspense>
		</main>
	);
};
