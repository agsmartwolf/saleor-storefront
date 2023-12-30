import React from "react";
import clsx from "clsx";
import { AlertIcon, SuccessIcon } from "../../assets/icons";

import { useOrder } from "../../hooks/useOrder";
import { usePaymentMeta, usePaymentStatus } from "../PaymentSection/utils";
import { Section } from "./Section";
import { SelectBox } from "@/checkout/components";
import { PAYMENT_METHODS } from "@/checkout/sections/PaymentSection/PaymentMethods";

const ErrorMessage = ({ message }: { message: string }) => {
	return (
		<>
			<p className="mr-1 text-red-500">{message}</p>
			<AlertIcon />
		</>
	);
};

const SuccessMessage = ({ message }: { message: string }) => {
	return (
		<>
			<p color="success" className="mr-1">
				{message}
			</p>
			<SuccessIcon />
		</>
	);
};

export const PaymentSection = () => {
	const { order } = useOrder();
	const paymentStatus = usePaymentStatus(order);
	const paymentMethod = usePaymentMeta({ order });
	return (
		<Section title="Payment">
			<div data-testid="paymentStatus">
				<div className="flex flex-row items-center">
					{paymentMethod ? (
						<div
							className={clsx(
								"relative mb-2 flex flex-row items-center justify-start rounded border border-neutral-400 px-3 py-2",
								"border border-neutral-500 hover:border hover:border-neutral-500",
							)}
						>
							<div className="min-h-12 pointer-events-none flex grow flex-col justify-center">
								<div className="flex flex-row items-center justify-between self-stretch">
									<p>{PAYMENT_METHODS.find((m) => m?.id === paymentMethod.value)?.label}</p>
								</div>
							</div>
						</div>
					) : null}
					{paymentStatus === "authorized" && (
						<SuccessMessage message="We've received your payment authorization" />
					)}

					{paymentStatus === "paidInFull" && <SuccessMessage message="We've received your payment" />}

					{paymentStatus === "overpaid" && (
						<ErrorMessage message="Your order has been paid more than owed. This may be an error during payment. Contact your shop staff for help." />
					)}
				</div>
			</div>
		</Section>
	);
};
