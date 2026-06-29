import { useState, useMemo } from 'react'
import { useProducts } from './hooks/useProducts'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import ProductGrid from './components/ProductGrid'
import Skeleton from './components/Skeleton'
import Footer from './components/Footer'

function App() {
  const { products, loading, error } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null)
  const [selectedRam, setSelectedRam] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<string | null>(null)

  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort(),
    [products]
  )

  const allStorages = useMemo(
    () =>
      [
        ...new Set(
          products.flatMap((p) => p.variants.map((v) => v.storage)).filter(Boolean)
        ),
      ].sort(),
    [products]
  )

  const allRams = useMemo(
    () =>
      [
        ...new Set(
          products.flatMap((p) => p.variants.map((v) => v.ram)).filter(Boolean)
        ),
      ].sort(),
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
    const hasAttributeFilter = selectedStorage || selectedRam
    if (hasAttributeFilter) {
      result = result.filter((p) =>
        p.variants.some(
          (v) =>
            (!selectedStorage || v.storage === selectedStorage) &&
            (!selectedRam || v.ram === selectedRam)
        )
      )
    }
    if (sortOrder === 'price-asc') {
      result = [...result].sort((a, b) => a.minPrice - b.minPrice)
    } else if (sortOrder === 'price-desc') {
      result = [...result].sort((a, b) => b.minPrice - a.minPrice)
    }
    return result
  }, [products, selectedBrand, searchQuery, selectedStorage, selectedRam, sortOrder])

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <div className="fixed inset-0 bg-grain opacity-[0.03] pointer-events-none z-0" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <FilterBar
            brands={brands}
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            storages={allStorages}
            selectedStorage={selectedStorage}
            onSelectStorage={setSelectedStorage}
            rams={allRams}
            selectedRam={selectedRam}
            onSelectRam={setSelectedRam}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
          {loading ? (
            <div className="px-5 lg:px-10 pb-16 md:pb-20">
              <div className="max-w-7xl mx-auto">
                <Skeleton />
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20 px-5">
              <p className="text-[17px] text-[#EF4444] font-semibold">{error}</p>
              <p className="text-[13px] text-[var(--color-text-secondary)] mt-2">
                Verifique se a planilha está publicada como CSV.
              </p>
            </div>
          ) : (
            <ProductGrid products={filtered} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
