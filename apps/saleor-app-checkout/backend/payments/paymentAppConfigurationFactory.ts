import { type Client } from "urql";
import { type MetadataEntry } from "@saleor/app-sdk/settings-manager";
import { PaymentAppConfigurator } from "@/saleor-app-checkout/backend/payments/paymentAppConfiguration";
import {
  createPrivateSettingsManager,
  createWebhookPrivateSettingsManager,
} from "@/saleor-app-checkout/backend/configuration/metadataManager";

export const getPaymentAppConfigurator = (client: Client, saleorApiUrl: string) => {
  return new PaymentAppConfigurator(createPrivateSettingsManager(client), saleorApiUrl);
};

export const getWebhookPaymentAppConfigurator = (
  data: { privateMetadata: readonly Readonly<MetadataEntry>[] },
  saleorApiUrl: string,
) => {
  return new PaymentAppConfigurator(
    createWebhookPrivateSettingsManager(data.privateMetadata as MetadataEntry[]),
    saleorApiUrl,
  );
};
