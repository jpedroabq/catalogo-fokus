import { ProductRow, GroupedProduct, ProductVariant } from '../types'

export function groupProducts(rows: ProductRow[]): GroupedProduct[] {
  const groups = new Map<string, GroupedProduct>()

  for (const row of rows) {
    const key = `${row.brand}|${row.model}`.toLowerCase()

    if (!groups.has(key)) {
      groups.set(key, {
        brand: row.brand,
        model: row.model,
        variants: [],
        colors: [],
        storages: [],
        rams: [],
        minPrice: Infinity,
        maxPrice: -Infinity,
      })
    }

    const group = groups.get(key)!
    const price = parseFloat(row.price) || 0
    const variant: ProductVariant = {
      color: row.color,
      storage: row.storage,
      ram: row.ram,
      price,
    }

    group.variants.push(variant)
    if (row.color && !group.colors.includes(row.color)) group.colors.push(row.color)
    if (row.storage && !group.storages.includes(row.storage)) group.storages.push(row.storage)
    if (row.ram && !group.rams.includes(row.ram)) group.rams.push(row.ram)
    if (price < group.minPrice) group.minPrice = price
    if (price > group.maxPrice) group.maxPrice = price
  }

  return Array.from(groups.values())
}
