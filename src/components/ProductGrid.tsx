import type { GroupedProduct } from '../types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: GroupedProduct[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 px-5">
        <p className="text-[17px] text-[var(--color-text-secondary)]">
          Nenhum produto encontrado.
        </p>
      </div>
    )
  }

  return (
    <div className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-[13px] font-semibold tracking-[-0.008em] text-[var(--color-text-secondary)]">
          {products.length} {products.length === 1 ? 'modelo' : 'modelos'}
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-5">
          {products.map((product, i) => (
            <ProductCard key={`${product.brand}-${product.model}-${i}`} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
