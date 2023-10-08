import { AddressField } from "@/checkout-storefront/components/AddressForm/types";
import { defineMessages } from "react-intl";

export type LocalizedAddressFieldLabel =
  | "province"
  | "district"
  | "state"
  | "zip"
  | "postal"
  | "postTown";

export type AddressFieldLabel = Exclude<AddressField, "countryCode"> | "country";

export const localizedAddressFieldMessages = defineMessages<LocalizedAddressFieldLabel>({
  province: {
    defaultMessage: "Province",
    id: "XI2F1P",
    description: "province",
  },
  district: {
    defaultMessage: "District",
    id: "X/8oa4",
    description: "district",
  },
  state: {
    defaultMessage: "State",
    id: "Zdvjjr",
    description: "state",
  },
  zip: {
    defaultMessage: "Zip code",
    id: "tGSbvd",
    description: "zip code",
  },
  postal: {
    defaultMessage: "Postal code",
    id: "0KU6nT",
    description: "postal code",
  },
  postTown: {
    defaultMessage: "Post town",
    id: "OxxX1m",
    description: "post town",
  },
});

export const addressFieldMessages = defineMessages<AddressFieldLabel>({
  city: { defaultMessage: "City", id: "X51P1g", description: "city" },
  firstName: {
    defaultMessage: "First name",
    id: "Jbz2k6",
    description: "first name",
  },
  countryArea: {
    defaultMessage: "Country area",
    id: "dxC3yk",
    description: "country area",
  },
  lastName: {
    defaultMessage: "Last name",
    id: "K/a8rS",
    description: "last name",
  },
  country: {
    defaultMessage: "Country",
    id: "KyH9NK",
    description: "country",
  },
  cityArea: {
    defaultMessage: "City area",
    id: "7bJ7Hd",
    description: "city area",
  },
  postalCode: {
    defaultMessage: "Postal code",
    id: "0KU6nT",
    description: "postal code",
  },
  companyName: {
    defaultMessage: "Company",
    id: "QXvSmh",
    description: "company",
  },
  streetAddress1: {
    defaultMessage: "Street address",
    id: "Y6dLvp",
    description: "street address",
  },
  streetAddress2: {
    defaultMessage: "Street address (continue)",
    id: "mbEUWh",
    description: "street address continue",
  },
  phone: {
    defaultMessage: "Phone number",
    id: "ljLaVr",
    description: "phone number",
  },
});
