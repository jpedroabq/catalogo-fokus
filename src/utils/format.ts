export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function rangePrice(min: number, max: number): string {
  if (min === max) return formatBRL(min)
  return `${formatBRL(min)} - ${formatBRL(max)}`
}
