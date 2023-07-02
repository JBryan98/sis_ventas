const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "PEN", style: "currency",
});

export function formatCurrency(value: number) {
    return CURRENCY_FORMATTER.format(value)
}