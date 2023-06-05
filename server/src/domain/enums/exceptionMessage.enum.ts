export const ExceptionMessages = {
  badRequest: 'Bad Request',
  unauthorized: 'Unautorized',
  forbidden: 'Forbidden',
  notFound: 'Not Found',
  alreadyExists: 'Already Exists',
  changed: 'Changed',
  unprocessableEntity: 'Unprocessable Entity',
  integrationFailed: 'Integration Failed',
  tooManyRequest: 'Too Many Requests',
  serverError: 'Internal Server Error',
  notImplemented: 'Not Implemented',
  unavailable: 'Service Unavailable',
} as const;

export type ExceptionMessage =
  (typeof ExceptionMessages)[keyof typeof ExceptionMessages];
