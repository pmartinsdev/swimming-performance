export const getNumberWithTwoDigits = (number: number) => {
  return number > 9 ? number.toString() : `0${number}`;
};
