export const genRandomId = (length = 6) => {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
};

export const base64encode = (value: string) => {
  return Buffer.from(value).toString('base64');
};

export const base64decode = (value: string) => {
  return Buffer.from(value, 'base64').toString('ascii');
};
