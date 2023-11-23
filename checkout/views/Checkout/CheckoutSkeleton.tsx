import { CheckoutFormSkeleton } from "../../sections/CheckoutForm";
import { PageHeader } from "../../sections/PageHeader";
import { SummarySkeleton } from "../../sections/Summary";

export const CheckoutSkeleton = () => (
	<div className="min-h-screen px-4 lg:px-0">
		<div className="">
			<PageHeader />
			<div className="grid grid-cols-1 gap-x-16 lg:grid-cols-2">
				<CheckoutFormSkeleton />
				<div className="h-6 w-full lg:h-full lg:w-5" />
				<SummarySkeleton />
			</div>
		</div>
	</div>
);
