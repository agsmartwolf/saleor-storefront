import { CheckIcon, XIcon } from "lucide-react";
import { type ProductVariant } from "@/gql/graphql";

type Props = {
	isAvailable: boolean;
	selectedVariant?: ProductVariant;
	content: {
		inStock: string;
		outOfStock: string;
		selectVariant: string;
	};
};

const pClasses = "ml-1 text-sm font-semibold text-neutral-500";

export const AvailabilityMessage = ({ isAvailable, selectedVariant, content }: Props) => {
	if (isAvailable && selectedVariant) {
		return (
			<div className="mt-2 flex items-center">
				<CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
				<p className={pClasses}>{content.inStock}</p>
			</div>
		);
	}
	if (selectedVariant && !isAvailable) {
		return (
			<div className="mt-2 flex items-center">
				<XIcon className="h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
				<p className={pClasses}>{content.outOfStock}</p>
			</div>
		);
	}

	return (
		<div className="mt-2 flex items-center">
			<XIcon className="h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
			<p className={pClasses}>{content.selectVariant}</p>
		</div>
	);
};
