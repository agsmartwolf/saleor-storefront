import { PaymentGatewayConfig } from "@/checkout-storefront/graphql";
import {
  AdyenGatewayInitializePayload,
  DummyGatewayInitializePayload,
  GatewayId,
} from "@/checkout-storefront/sections/PaymentSection/AdyenDropIn/types";

export type PaymentGatewayId = GatewayId;

export type ParsedAdyenGateway = ParsedPaymentGateway<AdyenGatewayInitializePayload>;
export type ParsedDummyGateway = ParsedPaymentGateway<DummyGatewayInitializePayload>;

export type ParsedPaymentGateways = {
  adyen?: ParsedAdyenGateway;
  dummy?: ParsedDummyGateway;
};

export interface ParsedPaymentGateway<TData extends Record<string, any>>
  extends Omit<PaymentGatewayConfig, "data" | "id"> {
  data: TData;
  id: PaymentGatewayId;
}

export type PaymentStatus = "paidInFull" | "overpaid" | "none" | "authorized";
