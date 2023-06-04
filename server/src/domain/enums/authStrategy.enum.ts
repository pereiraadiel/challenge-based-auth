const AuthStrategy = {
  Math: 'Mathematical',
  ImageSet: 'ImageSet',
  WordSet: 'WordSet',
} as const;

export type AuthStrategy = (typeof AuthStrategy)[keyof typeof AuthStrategy];
