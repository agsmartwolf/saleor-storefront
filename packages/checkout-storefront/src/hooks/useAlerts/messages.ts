import { defineMessages } from "react-intl";

export const apiErrorMessages = defineMessages({
  somethingWentWrong: {
    defaultMessage: "Sorry, something went wrong. Please try again in a moment.",
    id: "7yexjS",
    description: "something went wrong",
  },
  requestPasswordResetEmailNotFoundError: {
    defaultMessage: "User with provided email has not been found",
    id: "FggIw/",
    description: "request password reset - email not found error",
  },
  requestPasswordResetEmailInactiveError: {
    defaultMessage: "User account with provided email is inactive",
    id: "wQ7eb8",
    description: "request password reset email inactive error",
  },
  checkoutShippingUpdateCountryAreaRequiredError: {
    defaultMessage: "Please select country area for shipping address",
    id: "vn9b/m",
    description: "checkout shipping update country area required error",
  },
  checkoutBillingUpdateCountryAreaRequiredError: {
    defaultMessage: "Please select country area for billing address",
    id: "JBUgUT",
    description: "checkout billing update country area required error",
  },
  checkoutFinalizePasswordRequiredError: {
    defaultMessage: "Please set user password before finalizing checkout",
    id: "dCkgOw",
    description: "checkout finalize password required error",
  },
  checkoutEmailUpdateEmailInvalidError: {
    defaultMessage: "Provided email is invalid",
    id: "dKzVev",
    description: "checkout email update email invalid error",
  },
  checkoutAddPromoCodePromoCodeInvalidError: {
    defaultMessage: "Invalid promo code provided",
    id: "yGh+vi",
    description: "checkout add promo code - promo code invalid error",
  },
  userAddressUpdatePostalCodeInvalidError: {
    defaultMessage: "Invalid postal code provided to address form",
    id: "uc7gzX",
    description: "user address update - postal code invalid error",
  },
  userAddressCreatePostalCodeInvalidError: {
    defaultMessage: "Invalid postal code provided to address form",
    id: "wLQO7F",
    description: "user address create - postal code invalid error",
  },
  userRegisterPasswordPasswordTooShortError: {
    defaultMessage: "Provided password is too short",
    id: "mJ81Pa",
    description: "user register - password too short error",
  },
  checkoutPayShippingMethodNotSetError: {
    defaultMessage: "Please choose delivery method before finalizing checkout",
    id: "k0+Kez",
    description: "checkout pay - shipping method not set error",
  },
  checkoutEmailUpdateEmailRequiredError: {
    defaultMessage: "Email cannot be empty",
    id: "a77ZZO",
    description: "checkout email update - email required error",
  },
  checkoutPayTotalAmountMismatchError: {
    defaultMessage: "Couldn't finalize checkout, please try again",
    id: "glpqLA",
    description: "checkout pay - total amount mismatch error",
  },
  checkoutPayEmailNotSetError: {
    defaultMessage: "Please fill in email before finalizing checkout",
    id: "7/Bo7+",
    description: "checkout pay - email not set error",
  },
  userRegisterEmailUniqueError: {
    defaultMessage: "Cannot create account with email that is already used",
    id: "Vx4W5S",
    description: "user register - email unique error",
  },
  loginEmailInactiveError: {
    defaultMessage: "Account with provided email is inactive",
    id: "ESuR0A",
    description: "login - email inactive error",
  },
  loginEmailNotFoundError: {
    defaultMessage: "Account with provided email was not found",
    id: "LrYpGU",
    description: "login - email not found error",
  },
  loginEmailAccountNotConfirmedError: {
    defaultMessage: "Account hasn't been confirmed",
    id: "iTl+Qz",
    description: "login - account not confirmed error",
  },
  resetPasswordPasswordPasswordTooShortError: {
    defaultMessage: "Provided password is too short",
    id: "Xd2N1c",
    description: "reset password - password too short error",
  },
  resetPasswordTokenInvalidError: {
    defaultMessage: "Provided reset password token is expired or invalid",
    id: "EwTHLm",
    description: "reset password - token invalid error",
  },
  checkoutLinesUpdateQuantityQuantityGreaterThanLimitError: {
    defaultMessage: "Couldn't update line - buy limit for this item exceeded",
    id: "KXWHsh",
    description: "checkout lines update - quantity greater than limit error",
  },
  checkoutLinesUpdateQuantityInsufficientStockError: {
    defaultMessage: "Couldn't update line - insufficient stock in warehouse",
    id: "oyFho2",
    description: "checkout lines update - insufficient stock error",
  },
  signInEmailInvalidCredentialsError: {
    defaultMessage: "Invalid credentials provided to login",
    id: "nX71XF",
    description: "login - invalid credentials error",
  },
  signInEmailInactiveError: {
    defaultMessage: "The account you're trying to sign in to is inactive",
    id: "HmxWx+",
    description: "the account youre trying to sign in to is inactive",
  },
  checkoutShippingUpdatePostalCodeInvalidError: {
    defaultMessage: "Invalid postal code was provided for shipping address",
    id: "2leXNc",
    description: "checkout shipping update - postal code invalid error",
  },
  checkoutShippingUpdatePhoneInvalidError: {
    defaultMessage: "Invalid phone number was provided for shipping address",
    id: "jxRMRZ",
    description: "checkout shipping update - postal code invalid error",
  },
  checkoutBillingUpdatePostalCodeInvalidError: {
    defaultMessage: "Invalid postal code was provided for billing address",
    id: "8fk/m5",
    description: "checkout billing update - postal code invalid error",
  },
  checkoutDeliveryMethodUpdatePostalCodeInvalidError: {
    defaultMessage: "Invalid postal code was provided for shipping address",
    id: "2leXNc",
    description: "checkout shipping update - postal code invalid error",
  },
  checkoutDeliveryMethodUpdatePromoCodeInvalidError: {
    defaultMessage: "Please provide a valid discount code.",
    id: "OUpWUk",
    description: "please provide a valid discount code",
  },
});
