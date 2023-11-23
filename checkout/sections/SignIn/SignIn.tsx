import React from "react";
import { Button } from "../../components/Button";
import { PasswordInput } from "../../components/PasswordInput";
import { TextInput } from "../../components/TextInput";
import { useSignInForm } from "./useSignInForm";
import { usePasswordResetRequest } from "./usePasswordResetRequest";
import { FormProvider } from "../../hooks/useForm/FormProvider";
import {
	SignInFormContainer,
	type SignInFormContainerProps,
} from "../Contact/SignInFormContainer";
import { isValidEmail } from "../../lib/utils/common";
import { useErrorMessages } from "../../hooks/useErrorMessages";
import { useCheckout } from "../../hooks/useCheckout";

interface SignInProps extends Pick<SignInFormContainerProps, "onSectionChange"> {
	onSignInSuccess: () => void;
	onEmailChange: (email: string) => void;
	email: string;
}

export const SignIn: React.FC<SignInProps> = ({
	onSectionChange,
	onSignInSuccess,
	onEmailChange,
	email: initialEmail,
}) => {
	const {
		checkout: { email: checkoutEmail },
	} = useCheckout();
	const { errorMessages } = useErrorMessages();

	const form = useSignInForm({
		onSuccess: onSignInSuccess,
		initialEmail: initialEmail || checkoutEmail || "",
	});

	const {
		values: { email },
		handleChange,
		setErrors,
		setTouched,
		isSubmitting,
	} = form;

	const { onPasswordResetRequest, passwordResetSent } = usePasswordResetRequest({
		email,
		shouldAbort: async () => {
			// @todo we'll use validateField once we fix it because
			// https://github.com/jaredpalmer/formik/issues/1755
			const isValid = await isValidEmail(email);

			if (!isValid) {
				await setTouched({ email: true });
				setErrors({ email: errorMessages.emailInvalid });
				return true;
			}
			setErrors({});

			return false;
		},
	});

	return (
		<SignInFormContainer
			title="Sign in"
			redirectSubtitle="New customer?"
			redirectButtonLabel="Guest checkout"
			onSectionChange={onSectionChange}
		>
			<FormProvider form={form}>
				<TextInput
					required
					name="email"
					label="Email"
					onChange={(event) => {
						handleChange(event);
						onEmailChange(event.currentTarget.value);
					}}
				/>
				<PasswordInput name="password" label="Password" />
				<div className="flex w-full flex-row items-center justify-end py-4">
					<Button
						ariaDisabled={isSubmitting}
						ariaLabel="send password reset link"
						variant="tertiary"
						label={passwordResetSent ? "Resend?" : "Forgot password?"}
						className="ml-1 mr-4"
						onClick={(e) => (isSubmitting ? e.preventDefault() : onPasswordResetRequest)}
					/>
					<Button
						type="submit"
						disabled={isSubmitting}
						ariaLabel={"Sign in"}
						label={isSubmitting ? "Processing…" : "Sign in"}
					/>
				</div>
			</FormProvider>
		</SignInFormContainer>
	);
};
