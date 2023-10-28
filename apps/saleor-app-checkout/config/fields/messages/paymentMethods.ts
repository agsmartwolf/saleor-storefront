import { defineMessages } from "react-intl";
import { PaymentMethodID } from "checkout-common";

export const paymentMethodsMessages = defineMessages<PaymentMethodID>({
  creditCard: {
    defaultMessage: "Credit card",
    id: "IKIBYk",
    description: "payment method",
  },
  applePay: {
    defaultMessage: "Apple Pay",
    id: "BFIFWS",
    description: "payment method",
  },
  paypal: {
    defaultMessage: "PayPal",
    id: "nXqPc7",
    description: "payment method",
  },
  dropin: {
    defaultMessage: "Drop-in",
    id: "6bexF4",
    description: "payment method",
  },
  dummy: {
    defaultMessage: "Dummy Payment",
    id: "2dP9Gd",
    description: "dummy payment method",
  },
  cash: {
    defaultMessage: "Cash Payment",
    id: "5jnsD0",
    description: "cash payment method",
  },
  bankTransfer: {
    defaultMessage: "Bank transfer Payment",
    id: "tmxqTX",
    description: "bank transfer payment method",
  },
});
