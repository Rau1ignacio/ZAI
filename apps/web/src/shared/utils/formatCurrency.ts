export function formatCurrency(value: number, currency: "CLP" | "USD") {
  const fractionDigits = currency === "CLP" ? 0 : 2;
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}
