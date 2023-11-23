"server-only";

import { promises as fs } from "fs";
import { type MessageFormatElement } from "react-intl";
import { createIntl } from "@formatjs/intl";

const getMessages = async (
	locale: string,
	namespace: string,
): Promise<Record<string, MessageFormatElement[]> | Record<string, string>> => {
	console.log(locale);
	console.log(namespace);
	const data = await fs.readFile(process.cwd() + `/messages/${locale}/${namespace}.json`, "utf8");
	return JSON.parse(data) as Record<string, MessageFormatElement[]> | Record<string, string>;
};

export default async function getIntl(locale: string, namespace: string) {
	return createIntl({
		locale: locale,
		messages: await getMessages(locale, namespace),
	});
}
