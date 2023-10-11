import { SWLogo } from "@/checkout-storefront/images";
import { getSvgSrc } from "@/checkout-storefront/lib/svgSrc";
import { LanguageSelect } from "@/checkout-storefront/sections/PageHeader/LanguageSelect";

export const PageHeader = () => {
  return (
    <div className="page-header">
      <img src={getSvgSrc(SWLogo)} alt="logo" className="logo" />
      <LanguageSelect />
    </div>
  );
};
