import { Suspense, useState } from "react";
import { useCheckout } from "../../hooks/useCheckout";
import { Contact } from "../Contact";
import { DeliveryMethods } from "../DeliveryMethods";
import { ContactSkeleton } from "../Contact/ContactSkeleton";
import { DeliveryMethodsSkeleton } from "../DeliveryMethods/DeliveryMethodsSkeleton";
import { AddressSectionSkeleton } from "../../components/AddressSectionSkeleton";
import { getQueryParams } from "../../lib/utils/url";
import { CollapseSection } from "./CollapseSection";
import { Divider } from "../../components";
import { UserShippingAddressSection } from "../UserShippingAddressSection";
import { GuestShippingAddressSection } from "../GuestShippingAddressSection";
import { UserBillingAddressSection } from "../UserBillingAddressSection";
import { PaymentSection, PaymentSectionSkeleton } from "../PaymentSection";
import { GuestBillingAddressSection } from "../GuestBillingAddressSection";
import { useUser } from "../../hooks/useUser";

export const CheckoutForm = () => {
	const { user } = useUser();
	const { checkout } = useCheckout();
	const { passwordResetToken } = getQueryParams();

	const [showOnlyContact, setShowOnlyContact] = useState(!!passwordResetToken);

	return (
		<div className="flex flex-col items-end">
			<div className="flex w-full flex-col rounded">
				<Suspense fallback={<ContactSkeleton />}>
					<Contact setShowOnlyContact={setShowOnlyContact} />
				</Suspense>
				<>
					{checkout?.isShippingRequired && (
						<Suspense fallback={<AddressSectionSkeleton />}>
							<CollapseSection collapse={showOnlyContact}>
								<Divider />
								<div className="py-4" data-testid="shippingAddressSection">
									{user ? <UserShippingAddressSection /> : <GuestShippingAddressSection />}
								</div>
							</CollapseSection>
						</Suspense>
					)}
					<Suspense fallback={<DeliveryMethodsSkeleton />}>
						<DeliveryMethods collapsed={showOnlyContact} />
					</Suspense>
					<Suspense fallback={<PaymentSectionSkeleton />}>
						<CollapseSection collapse={showOnlyContact}>
							<PaymentSection>
								{user ? <UserBillingAddressSection /> : <GuestBillingAddressSection />}
							</PaymentSection>
						</CollapseSection>
					</Suspense>
				</>
			</div>
		</div>
	);
};
