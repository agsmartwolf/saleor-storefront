import { ErrorCode } from "@/checkout-storefront/lib/globalTypes";
import { defineMessages } from "react-intl";

export const fieldErrorMessages = defineMessages<ErrorCode>({
  invalid: {
    defaultMessage: "Invalid value",
    id: "ebt/9V",
    description: "invalid value",
  },
  required: {
    defaultMessage: "Required field",
    id: "GmjKcs",
    description: "required field",
  },
  unique: {
    defaultMessage: "Value must be unique",
    id: "GrUSxl",
    description: "value must be unique",
  },
  emailInvalid: {
    defaultMessage: "Email must be a valid email",
    id: "y5NEQs",
    description: "email must be a valid email",
  },
  passwordAtLeastCharacters: {
    defaultMessage: "Password must be at least 8 characters",
    id: "Hz38OL",
    description: "password must be at least 8 characters",
  },
  passwordTooShort: {
    defaultMessage: "Provided password is too short. Minimum length is 8 characters.",
    id: "W/xrYy",
    description: "password too short",
  },
  passwordTooSimilar: {
    defaultMessage: "Provided password is too similar to your previous password.",
    id: "wVsmCj",
    description: "password too similar",
  },
  passwordTooCommon: {
    defaultMessage: "Provided password is too common. Use something more fancy.",
    id: "v+nLdX",
    description: "password too common",
  },
  passwordInvalid: {
    defaultMessage: "Provided password is invalid.",
    id: "ZnQ753",
    description: "password invalid",
  },
  quantityGreaterThanLimit: {
    defaultMessage: "Chosen quantity is more than limit allowed.",
    id: "+WMTds",
    description: "quantity greater than limit",
  },
  insufficientStock: {
    defaultMessage: "Not enough of chosen item in stock.",
    id: "OOj8Aa",
    description: "insufficient stock",
  },
  invalidCredentials: {
    defaultMessage: "Invalid credentials provided at login.",
    id: "YaHFRg",
    description: "invalid credentials",
  },
  missingFields: {
    defaultMessage: "Missing fields in address form: ",
    id: "RcmVPj",
    description: "missing fields in address form",
  },
});
