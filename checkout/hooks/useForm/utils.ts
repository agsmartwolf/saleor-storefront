import { type FormErrors } from "./types";

export const hasErrors = (formErrors: FormErrors<any>) => !!Object.keys(formErrors).length;
