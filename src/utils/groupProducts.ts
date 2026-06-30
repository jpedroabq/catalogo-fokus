import { ProductRow, GroupedProduct, ProductVariant } from '../types'

function normalizeRam(val: string): string {
  return val.replace(/\s*gb$/i, '').trim()
}

function normalizeStorage(val: string): string {
  return val.replace(/\s*gb$/i, '').trim()
}

function normalizePrice(val: string): number {
  const cleaned = val
    .replace(/^R?\$?\s*/i, '')
    .replace(/\./g, '')
    .replace(',', '.')
  return parseFloat(cleaned) || 0
}

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
    const price = normalizePrice(row.price)
    const stock = parseInt(row.stock, 10) || 0
    const ram = normalizeRam(row.ram)
    const storage = normalizeStorage(row.storage)
    if (stock === 0) continue

    const variant: ProductVariant = {
      color: row.color,
      storage,
      ram,
      price,
      images: (row.imageurl ?? '').split(',').map((u) => u.trim()).filter(Boolean),
      stock,
    }

    group.variants.push(variant)
    if (row.color && !group.colors.includes(row.color)) group.colors.push(row.color)
    if (storage && !group.storages.includes(storage)) group.storages.push(storage)
    if (ram && !group.rams.includes(ram)) group.rams.push(ram)
    if (price < group.minPrice) group.minPrice = price
    if (price > group.maxPrice) group.maxPrice = price
  }

  return Array.from(groups.values()).filter((g) => g.variants.length > 0)
}
