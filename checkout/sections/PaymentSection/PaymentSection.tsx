import React from "react";
import { PaymentMethods } from "./PaymentMethods";
import { Divider } from "../../components/Divider";
import { Title } from "../../components/Title";
import { type Children } from "../../lib/globalTypes";

export const PaymentSection: React.FC<Children> = ({ children }) => {
	return (
		<>
			<Divider />
			<div className="py-6" data-testid="paymentMethods">
				<Title>Payment methods</Title>
				<PaymentMethods />
				{children}
			</div>
		</>
	);
};
