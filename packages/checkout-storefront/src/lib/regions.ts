export const locales = ["en-US", "en"] as const;

export const DEFAULT_LOCALE = "en-US";

export const DEFAULT_CHANNEL = "georgia";

export type Locale = (typeof locales)[number];
