import { serverEnvVars } from "@/saleor-app-checkout/constants";
import { SettingValue } from "@/saleor-app-checkout/types/api";
import CryptoJS from "crypto-js";
import invariant from "ts-invariant";
import { toStringOrEmpty } from "@/saleor-app-checkout/utils/common";

export const OBFUSCATION_DOTS = "••••";

export const obfuscateValue = (value: string) => {
  const unobfuscatedLength = Math.min(4, value.length - 4);

  // if value is 4 characters or less, obfuscate entire value
  if (unobfuscatedLength <= 0) {
    return OBFUSCATION_DOTS;
  }

  const unobfuscatedValue = value.slice(-unobfuscatedLength);

  return OBFUSCATION_DOTS + " " + unobfuscatedValue;
};

export const encryptSetting = (settingValue: string): SettingValue => {
  invariant(
    serverEnvVars.settingsEncryptionSecret,
    "Cannot encrypt settings when SETTINGS_ENCRYPTION_SECRET is not configured",
  );
  return {
    encrypted: true,
    value:
      CryptoJS.AES.encrypt(settingValue, serverEnvVars.settingsEncryptionSecret).toString() || "",
  };
};

export const decryptSetting = (settingValue: SettingValue, obfuscateEncryptedData: boolean) => {
  invariant(
    serverEnvVars.settingsEncryptionSecret,
    "Cannot decrypt settings when SETTINGS_ENCRYPTION_SECRET is not configured",
  );
  const decrypted =
    CryptoJS.AES.decrypt(settingValue.value, serverEnvVars.settingsEncryptionSecret).toString(
      CryptoJS.enc.Utf8,
    ) || "";

  if (obfuscateEncryptedData) {
    return obfuscateValue(decrypted);
  }

  return decrypted;
};

export const deobfuscateValues = (values: Record<string, unknown>) => {
  const entries = Object.entries(values).map(
    ([key, value]) =>
      [key, toStringOrEmpty(value).includes(OBFUSCATION_DOTS) ? null : value] as [string, unknown],
  );
  return Object.fromEntries(entries);
};