import { saleorApp } from "@/saleor-app-checkout/config/saleorApp";
import { SaleorSyncWebhook } from "@saleor/app-sdk/handlers/next";
import {
  PaymentGatewayInitializeDocument,
  PaymentGatewayInitializeSessionEventFragment,
} from "@/saleor-app-checkout/graphql";
import { getSyncWebhookHandler } from "@/saleor-app-checkout/backend/middlewares";
import { createLogger } from "@/saleor-app-checkout/utils/logger";
import invariant from "ts-invariant";
import ValidatePaymentGatewayInitializeSessionResponse, {
  type PaymentGatewayInitializeSessionResponse,
} from "@/saleor-app-checkout/schemas/PaymentGatewayInitializeSession/PaymentGatewayInitializeSessionResponse.mjs";
import { getWebhookPaymentAppConfigurator } from "@/saleor-app-checkout/backend/payments/paymentAppConfigurationFactory";
import { paymentAppFullyConfiguredEntrySchema } from "@/saleor-app-checkout/backend/payments/config-entry";
import { getConfigurationForChannel } from "@/saleor-app-checkout/backend/payments/paymentAppConfiguration";

export const paymentGatewayInitializeSessionSyncWebhook =
  new SaleorSyncWebhook<PaymentGatewayInitializeSessionEventFragment>({
    name: "PaymentGatewayInitializeSession",
    apl: saleorApp.apl,
    event: "PAYMENT_GATEWAY_INITIALIZE_SESSION",
    query: PaymentGatewayInitializeDocument,
    webhookPath: "/api/webhooks/saleor/payment-gateway-initialize-session",
  });
const PaymentGatewayInitializeSessionWebhookHandler = async (
  event: PaymentGatewayInitializeSessionEventFragment,
  saleorApiUrl: string,
): Promise<PaymentGatewayInitializeSessionResponse> => {
  const logger = createLogger(
    {},
    { msgPrefix: "[PaymentGatewayInitializeSessionWebhookHandler] " },
  );

  const app = event.recipient;
  invariant(app, "Missing event.recipient!");

  const { privateMetadata } = app;
  const configurator = getWebhookPaymentAppConfigurator({ privateMetadata }, saleorApiUrl);
  const appConfig = await configurator.getConfig();

  const stripeConfig = paymentAppFullyConfiguredEntrySchema.parse(
    getConfigurationForChannel(appConfig, event.sourceObject.channel.id),
  );

  logger.info({}, "Processing Payment Gateway Initialize request");
  const data = {
    publishableKey: stripeConfig.publishableKey,
  };
  const paymentGatewayInitializeSessionResponse: PaymentGatewayInitializeSessionResponse = {
    data,
  };
  return paymentGatewayInitializeSessionResponse;
};

export default paymentGatewayInitializeSessionSyncWebhook.createHandler(
  getSyncWebhookHandler(
    "paymentGatewayInitializeSessionSyncWebhook",
    PaymentGatewayInitializeSessionWebhookHandler,
    ValidatePaymentGatewayInitializeSessionResponse,
    (payload, errorResponse) => {
      return {
        message: errorResponse.message,
        data: {
          errors: errorResponse.errors,
          paymentMethodsResponse: {},
          publishableKey: "",
          environment: "TEST",
        },
      } as const;
    },
  ),
);
