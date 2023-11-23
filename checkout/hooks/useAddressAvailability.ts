import { useCallback } from "react";
import { type CountryCode } from "../graphql";
import { useAvailableShippingCountries } from "./useAvailableShippingCountries";

export const useAddressAvailability = (skipCheck = false) => {
	const { availableShippingCountries } = useAvailableShippingCountries();

	const isAvailable = useCallback(
		({ country }: { country: { code: string } }) => {
			if (skipCheck) {
				return true;
			}

			return availableShippingCountries.includes(country?.code as CountryCode);
		},
		[skipCheck, availableShippingCountries],
	);

	return { isAvailable, availableShippingCountries };
};
