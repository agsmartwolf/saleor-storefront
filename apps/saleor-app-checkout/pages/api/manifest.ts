import { appName } from "../../constants";
import { version } from "../../package.json";
// import { transactionActionRequestWebhook } from "@/saleor-app-checkout/pages/api/webhooks/saleor/transaction-action-request";
import { createManifestHandler } from "@saleor/app-sdk/handlers/next";
import { AppManifest } from "@saleor/app-sdk/types";
import { paymentGatewayInitializeSessionSyncWebhook } from "@/saleor-app-checkout/pages/api/webhooks/saleor/payment-gateway-initialize-session";

const isDev = process.env.NODE_ENV === "development";

const handler = createManifestHandler({
  async manifestFactory(context): Promise<AppManifest> {
    const { appBaseUrl } = context;

    return {
      id: `sw.saleor.checkout.app${isDev ? ".dev" : ""}`,
      version: `${version}${isDev ? "_DEV" : ""}`,
      name: `${appName}${isDev ? "_DEV" : ""}`,
      about: "Saleor checkout app to quickly configure and customize checkout in your store.",
      permissions: ["HANDLE_PAYMENTS", "HANDLE_CHECKOUTS", "MANAGE_ORDERS", "MANAGE_CHECKOUTS"],
      extensions: [
        {
          label: "Payments and checkouts",
          mount: "NAVIGATION_ORDERS",
          target: "APP_PAGE",
          permissions: ["MANAGE_CHECKOUTS"],
          url: "/",
        },
      ],
      appUrl: appBaseUrl,
      dataPrivacyUrl: `${appBaseUrl}/data-privacy`,
      supportUrl: `${appBaseUrl}/support`,
      tokenTargetUrl: `${appBaseUrl}/api/register`,
      webhooks: [
        paymentGatewayInitializeSessionSyncWebhook.getWebhookManifest(appBaseUrl),
        // transactionActionRequestWebhook.getWebhookManifest(appBaseUrl),
      ],
    };
  },
});

export default handler;
