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
    <div className="px-5 lg:px-10 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-[13px] font-semibold text-[var(--color-text-secondary)] mb-5 tracking-[-0.008em]">
          {products.length} {products.length === 1 ? 'modelo' : 'modelos'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {products.map((product, i) => (
            <ProductCard key={`${product.brand}-${product.model}-${i}`} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
