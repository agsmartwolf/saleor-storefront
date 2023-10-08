import {
  BrandingCustomizationSettingID,
  CustomizationID,
  ProductCustomizationSettingID,
} from "@/saleor-app-checkout/types/common";
import { defineMessages } from "react-intl";

export const customizationMessages = defineMessages<CustomizationID>({
  branding: {
    defaultMessage: "Branding",
    id: "4kEXS+",
    description: "customization",
  },
  productSettings: {
    defaultMessage: "Product settings",
    id: "X5y+L2",
    description: "customization",
  },
});

export const brandingCustomizationMessages = defineMessages<BrandingCustomizationSettingID>({
  buttonBgColorPrimary: {
    defaultMessage: "Button BG Primary",
    id: "D8irjQ",
    description: "customization setting",
  },
  buttonBgColorHover: {
    defaultMessage: "Button BG Hover",
    id: "/dYclm",
    description: "customization setting",
  },
  borderColorPrimary: {
    defaultMessage: "Border Primary",
    id: "m/r08F",
    description: "customization setting",
  },
  errorColor: {
    defaultMessage: "Error",
    id: "DopY6P",
    description: "customization setting",
  },
  successColor: {
    defaultMessage: "Success",
    id: "S/xcUp",
    description: "customization setting",
  },
  buttonTextColor: {
    defaultMessage: "Button Text",
    id: "0NYFC/",
    description: "customization setting",
  },
  textColor: {
    defaultMessage: "Text",
    id: "cNpy7H",
    description: "customization setting",
  },
  logoUrl: {
    defaultMessage: "Logo",
    id: "HpJ0xA",
    description: "customization setting",
  },
});

export const sectionsCustomizationMessages = defineMessages<ProductCustomizationSettingID>({
  lowStockThreshold: {
    defaultMessage: "Low stock threshold",
    id: "e9Fc8u",
    description: "customization setting",
  },
});
