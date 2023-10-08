import { defineMessages } from "react-intl";

export const orderInfoMessages = defineMessages({
  paymentSection: {
    defaultMessage: "Payment",
    id: "9VWqRC",
    description: "payment",
  },
  orderUnpaid: {
    defaultMessage:
      "The order has not been paid for. If you ordered a payment - check for the confirmation.",
    id: "4IPxGY",
    description: "order unpaid message",
  },
  orderPaid: {
    defaultMessage: "We've received your payment",
    id: "vcXZR6",
    description: "paid order message",
  },
  orderAuthorized: {
    defaultMessage: "We've received your payment authorization",
    id: "+SXlNJ",
    description: "We've received your payment authorization",
  },
  orderOvercharged: {
    defaultMessage:
      "Your order has been paid more than owed. This may be an error during payment. Contact your shop staff for help.",
    id: "1hMnDx",
  },
  orderConfirmTitle: {
    defaultMessage: "Order #{number} confirmed",
    id: "VjsJkY",
    description: "order confirmed",
  },
  orderConfirmSubtitle: {
    defaultMessage:
      "Thank you for placing your order. We’ve received it and we will contact you as soon as your package is shipped. A confirmation email has been sent to {email}.",
    id: "ty5n+J",
    description: "order confirmed subtitle",
  },
  paymentPending: {
    defaultMessage: "Your payment is being processed.",
    id: "MY0OAh",
    description: "payment pending",
  },
  orderPaymentStatusMissing: {
    defaultMessage:
      "We could not fetch information about your payment. If you ordered a payment - check for the confirmation and contact the store.",
    id: "nkRLWD",
    description: "order payment status missing",
  },
  orderPay: {
    defaultMessage: "Pay for the order",
    id: "H+et6P",
    description: "pay for the order",
  },
});

export const orderInfoLabels = defineMessages({
  orderPay: {
    defaultMessage: "order pay",
    id: "fdFTXC",
    description: "order pay accessibility label",
  },
});
