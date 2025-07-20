export const formatUAH = (amount: number, currency = 'UAH'): string => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency
  }).format(amount);
};

export const formatUSD = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};
