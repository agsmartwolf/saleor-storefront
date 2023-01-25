import { OptionalAddress } from "@/checkout-storefront/components/AddressForm/types";
import {
  getAddressInputDataFromAddress,
  getAddressValidationRulesVariables,
  isMatchingAddress,
  isMatchingAddressData,
} from "@/checkout-storefront/components/AddressForm/utils";
import { useCheckoutBillingAddressUpdateMutation } from "@/checkout-storefront/graphql";
import { useCheckout } from "@/checkout-storefront/hooks/useCheckout";
import { ChangeHandler, useForm } from "@/checkout-storefront/hooks/useForm";
import { useFormSubmit } from "@/checkout-storefront/hooks/useFormSubmit";
import { useCallback, useEffect, useRef } from "react";

interface BillingSameAsShippingFormData {
  billingSameAsShipping: boolean;
  billingAddress: OptionalAddress;
}

interface BillingSameAsShippingFormProps {
  autoSave: boolean;
  onSetBillingSameAsShipping?: (address: OptionalAddress) => void;
}

export const useBillingSameAsShippingForm = (
  { autoSave, onSetBillingSameAsShipping }: BillingSameAsShippingFormProps = { autoSave: false }
) => {
  const { checkout } = useCheckout();
  const { billingAddress, shippingAddress } = checkout;
  const previousShippingAddress = useRef<OptionalAddress>(shippingAddress);

  const [, checkoutBillingAddressUpdate] = useCheckoutBillingAddressUpdateMutation();

  const onSubmit = useFormSubmit<
    BillingSameAsShippingFormData,
    typeof checkoutBillingAddressUpdate
  >({
    scope: "checkoutBillingUpdate",
    onSubmit: checkoutBillingAddressUpdate,
    parse: ({ languageCode, checkoutId, billingAddress }) => ({
      languageCode,
      checkoutId,
      billingAddress: getAddressInputDataFromAddress(billingAddress),
      validationRules: getAddressValidationRulesVariables({ autoSave }),
    }),
    onSuccess: ({ formData, formHelpers: { resetForm }, result }) => {
      resetForm({
        values: {
          ...formData,
          billingAddress: result?.data?.checkoutBillingAddressUpdate?.checkout?.billingAddress,
        },
      });
    },
  });

  const getInitialShippingAsBillingValue = useCallback(() => {
    if (!checkout.isShippingRequired) {
      return false;
    }

    return !billingAddress || isMatchingAddress(shippingAddress, billingAddress);
  }, [shippingAddress, billingAddress, checkout.isShippingRequired]);

  const initialValues = {
    billingSameAsShipping: getInitialShippingAsBillingValue(),
    billingAddress: billingAddress,
  };

  const previousBillingSameAsShipping = useRef(initialValues.billingSameAsShipping);

  const form = useForm<BillingSameAsShippingFormData>({
    onSubmit,
    initialValues,
  });

  const {
    values: { billingSameAsShipping },
    setFieldValue,
    handleSubmit,
    handleChange,
  } = form;

  const onChange: ChangeHandler = (event) => {
    if (event.target.name === "billingSameAsShipping") {
      previousBillingSameAsShipping.current = billingSameAsShipping;
    }
    handleChange(event);
  };

  useEffect(() => {
    const handleBillingSameAsShippingChanged = async () => {
      const hasBillingSameAsShippingChanged =
        billingSameAsShipping && !previousBillingSameAsShipping.current;

      if (!hasBillingSameAsShippingChanged) {
        return;
      }

      previousBillingSameAsShipping.current = true;
      await setFieldValue("billingAddress", shippingAddress);
      if (typeof onSetBillingSameAsShipping === "function") {
        onSetBillingSameAsShipping(shippingAddress);
      }
    };

    void handleBillingSameAsShippingChanged();
  }, [
    billingSameAsShipping,
    handleSubmit,
    onSetBillingSameAsShipping,
    setFieldValue,
    shippingAddress,
  ]);

  useEffect(() => {
    if (!isMatchingAddress(billingAddress, form.values.billingAddress)) {
      handleSubmit();
    }
  }, [billingAddress, form.values.billingAddress, handleSubmit]);

  useEffect(() => {
    const handleShippingAddressChanged = async () => {
      const hasShippingAddressChanged = !isMatchingAddressData(
        shippingAddress,
        previousShippingAddress.current
      );

      if (!hasShippingAddressChanged) {
        return;
      }

      previousShippingAddress.current = shippingAddress;

      if (billingSameAsShipping) {
        await setFieldValue("billingAddress", shippingAddress);
        handleSubmit();
      }
    };

    void handleShippingAddressChanged();
  }, [billingSameAsShipping, handleSubmit, setFieldValue, shippingAddress]);

  return {
    ...form,
    handleChange: onChange,
  };
};
