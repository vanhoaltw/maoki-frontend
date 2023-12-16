export const formatPriceUsdt = (price?: number) => {
  if (typeof price === "undefined") return;
  // @ts-ignore
  return Number(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
