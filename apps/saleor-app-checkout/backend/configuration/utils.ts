import { defaultActiveChannelPaymentProviders } from "@/saleor-app-checkout/config/defaults";
import { ChannelFragment } from "@/saleor-app-checkout/graphql";
import {
  ChannelActivePaymentProviders,
  PublicSettingsValues,
} from "@/saleor-app-checkout/types/api";
import { obfuscateValue } from "@/saleor-app-checkout/backend/configuration/encryption";
import { isNotNullish, toStringOrEmpty } from "@/saleor-app-checkout/utils/common";

export const mergeChannelsWithPaymentProvidersSettings = (
  settings: PublicSettingsValues,
  channels?: ChannelFragment[] | null,
): ChannelActivePaymentProviders =>
  channels?.reduce((assignedSettings, channel) => {
    const channelSettings = assignedSettings[channel.id] || defaultActiveChannelPaymentProviders;

    return {
      ...assignedSettings,
      [channel.id]: channelSettings,
    };
  }, settings.channelActivePaymentProviders) || settings.channelActivePaymentProviders;

export const filterConfigValues = <T extends Record<string, unknown>>(values: T) => {
  const entries = Object.entries(values).filter(
    ([_, value]) => value !== null && value !== undefined,
  );
  return Object.fromEntries(entries);
};

export const obfuscateConfig = <T extends {}>(config: T): T => {
  const entries = Object.entries(config).map(([key, value]) => [
    key,
    isNotNullish(value) ? obfuscateValue(toStringOrEmpty(value)) : value,
  ]);

  return Object.fromEntries(entries) as T;
};
