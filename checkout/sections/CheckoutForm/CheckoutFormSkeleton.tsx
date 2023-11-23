import React from "react";
import { ContactSkeleton } from "../Contact";
import { DeliveryMethodsSkeleton } from "../DeliveryMethods";
import { PaymentSectionSkeleton } from "../PaymentSection";
import { Divider } from "../../components";
import { AddressSectionSkeleton } from "../../components/AddressSectionSkeleton";

export const CheckoutFormSkeleton = () => (
	<div className="flex flex-col items-end">
		<div className="flex w-full flex-col rounded ">
			<ContactSkeleton />
			<Divider />
			<AddressSectionSkeleton />
			<Divider />
			<DeliveryMethodsSkeleton />
			<Divider />
			<PaymentSectionSkeleton />
		</div>
	</div>
);
