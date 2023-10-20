import { SaleorSyncWebhook } from "@saleor/app-sdk/handlers/next";
import { getSyncWebhookHandler } from "@/saleor-app-checkout/backend/middlewares";
import ValidateTransactionInitializeSessionResponse, {
  type TransactionInitializeSessionResponse,
} from "@/saleor-app-checkout/schemas/TransactionInitializeSession/TransactionInitializeSessionResponse.mjs";
import type { PageConfig } from "next";
import { uuidv7 } from "uuidv7";
import { saleorApp } from "@/saleor-app-checkout/config/saleorApp";
import invariant from "ts-invariant";
// import { getWebhookPaymentAppConfigurator } from "@/saleor-app-checkout/backend/payments/paymentAppConfigurationFactory";
import {
  TransactionInitializeSessionEventFragment,
  TransactionInitializeSessionEventFragmentDoc,
} from "@/saleor-app-checkout/graphql";
import { createLogger } from "@/saleor-app-checkout/utils/logger";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export const transactionInitializeSessionSyncWebhook =
  new SaleorSyncWebhook<TransactionInitializeSessionEventFragment>({
    name: "TransactionInitializeSession",
    apl: saleorApp.apl,
    event: "TRANSACTION_INITIALIZE_SESSION",
    query: TransactionInitializeSessionEventFragmentDoc,
    webhookPath: "/api/webhooks/saleor/transaction-initialize-session",
  });

export const TransactionInitializeSessionWebhookHandler = async (
  event: TransactionInitializeSessionEventFragment,
  saleorApiUrl: string,
): Promise<TransactionInitializeSessionResponse> => {
  const logger = createLogger(
    { saleorApiUrl },
    { msgPrefix: "[TransactionInitializeSessionWebhookHandler] " },
  );
  logger.debug(
    {
      transaction: event.transaction,
      action: event.action,
      sourceObject: {
        lines: event.sourceObject.lines,
        channel: event.sourceObject.channel,
        __typename: event.sourceObject.__typename,
      },
      merchantReference: event.merchantReference,
    },
    "Received event",
  );

  const app = event.recipient;
  invariant(app, "Missing event.recipient!");

  // const { privateMetadata } = app;
  // const configurator = getWebhookPaymentAppConfigurator({ privateMetadata }, saleorApiUrl);
  // const appConfig = await configurator.getConfig();
  const transactionInitializeSessionResponse: TransactionInitializeSessionResponse = {
    result: "AUTHORIZATION_REQUEST",
    amount: -1,
    message: "TEST HOOK RESPONSE",
  };
  return transactionInitializeSessionResponse;
};

export default transactionInitializeSessionSyncWebhook.createHandler(
  getSyncWebhookHandler(
    "transactionInitializeSessionSyncWebhook",
    TransactionInitializeSessionWebhookHandler,
    ValidateTransactionInitializeSessionResponse,
    (payload, errorResponse) => {
      return {
        amount: 0,
        result:
          payload.action.actionType === "AUTHORIZATION"
            ? "AUTHORIZATION_FAILURE"
            : "CHARGE_FAILURE",
        message: errorResponse.message,
        data: { errors: errorResponse.errors, paymentIntent: {}, publishableKey: "" },
        // @todo consider making pspReference optional https://github.com/saleor/saleor/issues/12490
        pspReference: uuidv7(),
      } as const;
    },
  ),
);
