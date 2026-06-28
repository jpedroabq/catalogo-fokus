interface FilterBarProps {
  brands: string[]
  selectedBrand: string | null
  onSelectBrand: (brand: string | null) => void
}

export default function FilterBar({ brands, selectedBrand, onSelectBrand }: FilterBarProps) {
  return (
    <div className="px-5 lg:px-10 pb-6 overflow-x-auto">
      <div className="flex gap-2">
        <button
          onClick={() => onSelectBrand(null)}
          className={`px-4 py-2 rounded-[980px] text-[13px] font-semibold transition-all whitespace-nowrap ${
            selectedBrand === null
              ? 'bg-apple-blue text-white'
              : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text)] hover:bg-apple-blue hover:text-white'
          }`}
        >
          Todos
        </button>
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => onSelectBrand(brand)}
            className={`px-4 py-2 rounded-[980px] text-[13px] font-semibold transition-all whitespace-nowrap ${
              selectedBrand === brand
                ? 'bg-apple-blue text-white'
                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text)] hover:bg-apple-blue hover:text-white'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  )
}
