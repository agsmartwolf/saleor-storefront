import { type PaymentGatewayConfig } from "../../graphql";
import {
	type AdyenGatewayId,
	type AdyenGatewayInitializePayload,
} from "./AdyenDropIn/types";

export type PaymentGatewayId = AdyenGatewayId;

export type ParsedAdyenGateway = ParsedPaymentGateway<AdyenGatewayInitializePayload>;

export type ParsedPaymentGateways = {
	adyen?: ParsedAdyenGateway;
};

export interface ParsedPaymentGateway<TData extends Record<string, any>>
	extends Omit<PaymentGatewayConfig, "data" | "id"> {
	data: TData;
	id: PaymentGatewayId;
}

export type PaymentStatus = "paidInFull" | "overpaid" | "none" | "authorized";
