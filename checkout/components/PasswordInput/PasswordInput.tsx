import { useState } from "react";
import { EyeHiddenIcon, EyeIcon } from "../../ui-kit/icons";
import { IconButton } from "../IconButton";
import { TextInput, type TextInputProps } from "../TextInput";

export const PasswordInput = <TName extends string>(props: TextInputProps<TName>) => {
	const [passwordVisible, setPasswordVisible] = useState(false);

	return (
		<div className="relative">
			<TextInput required {...props} type={passwordVisible ? "text" : "password"} />
			<div className="absolute right-7 top-6 flex h-10 items-center justify-center pr-4">
				<IconButton
					ariaLabel="change password visibility"
					onClick={() => setPasswordVisible(!passwordVisible)}
					icon={passwordVisible ? <EyeIcon /> : <EyeHiddenIcon />}
				/>
			</div>
		</div>
	);
};
