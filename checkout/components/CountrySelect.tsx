import React from "react";
import { Select } from "./Select";
import { type CountryCode } from "../graphql";
import { countries as allCountries } from "../lib/consts/countries";
import { getCountryName } from "../lib/utils/locale";

interface CountrySelectProps {
	only?: CountryCode[];
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ only = [] }) => {
	const countriesToMap = only.length ? only : allCountries;

	const countryOptions = countriesToMap.map((countryCode) => ({
		value: countryCode,
		label: getCountryName(countryCode),
	}));

	return (
		<Select aria-label="Country" name="countryCode" options={countryOptions} autoComplete="countryCode" />
	);
};
