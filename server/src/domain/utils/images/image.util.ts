import { images } from './set.json';

export const getRandomSetOfImages = (length = 5, userSet: string[]) => {
  const set: typeof images = [];

  while (set.length < length) {
    const image =
      images[Math.floor(Math.random() * images.length) % images.length];

    if (set.indexOf(image) < 0 && userSet.indexOf(image.id) < 0) {
      set.push(image);
    }
  }

  return set;
};

export const getImageById = (id: string) => {
  return images.find((image) => image.id === id);
};
