export const formatPrice = (price: number | null | undefined, symbol = '') =>
  price !== null && price !== undefined ? formatThousandsWithSpace(price) : symbol;

export const formatThousandsWithSpace = (number: number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
