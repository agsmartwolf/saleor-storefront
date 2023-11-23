import clsx from "clsx";
import React, { type PropsWithChildren } from "react";
import { type Classes } from "../lib/globalTypes";

export const Title: React.FC<PropsWithChildren<Classes>> = ({ className, children }) => (
	<p className={clsx("mb-2 font-bold", className)}>{children}</p>
);
