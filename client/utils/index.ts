export const sleep = (ms = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const noop = () => {};

export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const getRandomNumberBetween = (min, max) =>
  Math.floor(Math.random() * max) + min;
