import { GroupedProduct } from '../types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: GroupedProduct[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5 lg:px-10 pb-16">
      {products.map((product, i) => (
        <ProductCard key={`${product.brand}-${product.model}`} product={product} index={i} />
      ))}
    </div>
  )
}
