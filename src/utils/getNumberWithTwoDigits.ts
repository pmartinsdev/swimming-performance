export const getNumberWithTwoDigits = (number: number): string => {
  return number > 9 ? number.toString() : `0${number}`;
};
