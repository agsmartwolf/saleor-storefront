import type { Middleware } from "retes";
import { Response } from "retes/response";
import { withSaleorDomainPresent } from "@saleor/app-sdk/middleware";
import { SALEOR_DOMAIN_HEADER } from "@saleor/app-sdk/const";
import { ValidateFunction } from "ajv";
import { BaseError, JsonSchemaError, UnknownError } from "@/saleor-app-checkout/utils/errors";
import { NextWebhookApiHandler } from "@saleor/app-sdk/handlers/next";
import { NextApiResponse } from "next";
import { createLogger, redactError } from "@/saleor-app-checkout/utils/logger";

export const withSaleorDomainMatch: Middleware = (handler) =>
  withSaleorDomainPresent(async (request) => {
    const saleorApiUrl = request.params.saleorApiUrl;
    if (!saleorApiUrl || typeof saleorApiUrl !== "string") {
      return Response.BadRequest({
        success: false,
        message: `Missing saleorApiUrl query param!`,
      });
    }

    const domain = new URL(saleorApiUrl).host;
    if (domain !== request.headers[SALEOR_DOMAIN_HEADER]) {
      return Response.BadRequest({
        success: false,
        message: `Invalid ${SALEOR_DOMAIN_HEADER} header: ${domain} != ${
          request.headers[SALEOR_DOMAIN_HEADER]?.toString() || "(no value)"
        }`,
      });
    }

    return handler(request);
  });

export const validateData = async <S extends ValidateFunction>(data: unknown, validate: S) => {
  type Result = S extends ValidateFunction<infer T> ? T : never;
  try {
    const isValid = validate(data);
    if (!isValid) {
      throw JsonSchemaError.normalize(validate.errors);
    }
    return data as Result;
  } catch (err) {
    throw UnknownError.normalize(err);
  }
};

export function getSyncWebhookHandler<TPayload, TResult, TSchema extends ValidateFunction<TResult>>(
  name: string,
  webhookHandler: (payload: TPayload, saleorApiUrl: string) => Promise<TResult>,
  ResponseSchema: TSchema,
  errorMapper: (payload: TPayload, errorResponse: ErrorResponse) => TResult & {},
): NextWebhookApiHandler<TPayload> {
  return async (_req, res: NextApiResponse<Error | TResult>, ctx) => {
    const logger = createLogger(
      {
        event: ctx.event,
      },
      { msgPrefix: `[${name}] ` },
    );
    const { authData, payload } = ctx;
    logger.info(`handler called: ${webhookHandler.name}`);
    logger.debug({ payload }, "ctx payload");

    try {
      const result = await webhookHandler(payload, authData.saleorApiUrl);
      logger.info(`${webhookHandler.name} was successful`);
      logger.debug({ result }, "Sending successful response");
      return res.json(await validateData(result, ResponseSchema));
    } catch (err) {
      logger.error({ err: redactError(err) }, `${webhookHandler.name} error`);

      const response = errorToResponse(err);

      if (!response) {
        // Sentry.captureException(err);
        const result = BaseError.serialize(err);
        logger.debug("Sending error response");
        return res.status(500).json(result);
      }

      // Sentry.captureException(...response.sentry);
      const finalErrorResponse = errorMapper(payload, response);
      logger.debug({ finalErrorResponse }, "Sending error response");
      return res.status(200).json(await validateData(finalErrorResponse, ResponseSchema));
    }
  };
}

type ErrorResponse = Exclude<ReturnType<typeof errorToResponse>, null>;
const errorToResponse = (err: unknown) => {
  const normalizedError = err instanceof BaseError ? err : null;

  if (!normalizedError) {
    return null;
  }

  const sentry = [
    normalizedError,
    {
      extra: {
        errors: normalizedError.errors,
      },
    },
  ] as const;

  const message = normalizedError.message;

  const errors = [
    {
      code: normalizedError.name,
      message: normalizedError.message,
      details: {},
    },
    ...(normalizedError.errors?.map((inner) => {
      return {
        code: inner.name,
        message: inner.message,
      };
    }) ?? []),
  ];

  return {
    sentry,
    errors,
    message,
  };
};
