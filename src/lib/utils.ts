export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const buildQueryString = (params: Record<string, string | undefined>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });
  return searchParams.toString();
};

export const cn = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
