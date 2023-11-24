"server-only";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { promises as fs } from "fs";
import { type MessageFormatElement } from "react-intl";
import { createIntl } from "@formatjs/intl";

const getMessages = async (
	locale: string,
	namespace: string,
): Promise<Record<string, MessageFormatElement[]> | Record<string, string>> => {
	const dName = dirname(fileURLToPath(import.meta.url));
	const p = path.resolve(dName, `../../messages/${locale}/${namespace}.json`);
	const data = await fs.readFile(p, "utf8");
	return JSON.parse(data) as Record<string, MessageFormatElement[]> | Record<string, string>;
};

export default async function getIntl(locale: string, namespace: string) {
	return createIntl({
		locale: locale,
		messages: await getMessages(locale, namespace),
	});
}
