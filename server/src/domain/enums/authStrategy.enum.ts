export const AuthStrategies = {
  Math: 'Mathematical',
  ImageSet: 'ImageSet',
  WordSet: 'WordSet',
} as const;

export type AuthStrategy = (typeof AuthStrategies)[keyof typeof AuthStrategies];
