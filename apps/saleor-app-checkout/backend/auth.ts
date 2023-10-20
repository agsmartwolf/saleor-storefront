import { NextApiRequest } from "next";
import invariant from "ts-invariant";
import { createLogger } from "@/saleor-app-checkout/utils/logger";
import { toStringOrEmpty } from "@/saleor-app-checkout/utils/common";
import { MissingAuthDataError, MissingSaleorApiUrlError } from "@/saleor-app-checkout/utils/errors";
import { saleorApp } from "@/saleor-app-checkout/config/saleorApp";

export const getSaleorApiUrlFromRequest = (req: NextApiRequest) => {
  const saleorApiUrl = req.query.saleorApiUrl;

  invariant(saleorApiUrl && typeof saleorApiUrl === "string", "saleorApiUrl is required");

  return saleorApiUrl;
};

export const getAuthDataForRequest = async (request: NextApiRequest) => {
  const logger = createLogger({}, { msgPrefix: "[getAuthDataForRequest] " });

  const saleorApiUrl = toStringOrEmpty(request.query.saleorApiUrl);
  logger.info(`Got saleorApiUrl=${saleorApiUrl || "<undefined>"}`);
  if (!saleorApiUrl) {
    throw new MissingSaleorApiUrlError("Missing saleorApiUrl query param");
  }

  const authData = await saleorApp.apl.get(saleorApiUrl);
  logger.debug({ authData });
  if (!authData) {
    throw new MissingAuthDataError(`APL for ${saleorApiUrl} not found`);
  }

  return authData;
};
