import { useState, useMemo } from 'react'
import { useTheme } from './hooks/useTheme'
import { useProducts } from './hooks/useProducts'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import ProductGrid from './components/ProductGrid'
import Skeleton from './components/Skeleton'
import Footer from './components/Footer'

function App() {
  useTheme()
  const { products, loading, error } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort(),
    [products]
  )

  const filtered = useMemo(() => {
    let result = products
    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.model.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
    }
    return result
  }, [products, selectedBrand, searchQuery])

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Hero />
      <FilterBar brands={brands} selectedBrand={selectedBrand} onSelectBrand={setSelectedBrand} />

      {loading ? (
        <Skeleton />
      ) : error ? (
        <div className="text-center py-20 px-5">
          <p className="text-[17px] text-apple-red font-semibold">{error}</p>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-2">
            Verifique se a planilha está publicada como CSV.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 px-5">
          <p className="text-[17px] text-[var(--color-text-secondary)]">
            Nenhum produto encontrado.
          </p>
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}

      <Footer />
    </div>
  )
}

export default App
