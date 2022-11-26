export const getNumberWithTwoDigits = (number: number) => {
  return number.toLocaleString("pt-BR", {
    minimumIntegerDigits: 2
  })
}
