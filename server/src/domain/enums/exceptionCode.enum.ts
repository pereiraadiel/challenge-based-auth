export const ExceptionCodes = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  alreadyExists: 409,
  changed: 410,
  unprocessableEntity: 422,
  integrationFailed: 422,
  tooManyRequest: 429,
  serverError: 500,
  notImplemented: 501,
  unavailable: 503,
} as const;

export type ExceptionCode =
  (typeof ExceptionCodes)[keyof typeof ExceptionCodes];
