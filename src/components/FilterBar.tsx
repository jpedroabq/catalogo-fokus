import { useState } from 'react'
import { MagnifyingGlassIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { BRAND_LOGOS } from '../brandLogos'

interface FilterBarProps {
  brands: string[]
  selectedBrand: string | null
  onSelectBrand: (brand: string | null) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  storages: string[]
  selectedStorage: string | null
  onSelectStorage: (storage: string | null) => void
  rams: string[]
  selectedRam: string | null
  onSelectRam: (ram: string | null) => void
}

function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
  formatOption,
}: {
  label: string
  options: string[]
  selected: string | null
  onSelect: (value: string | null) => void
  formatOption?: (value: string) => string
}) {
  return (
    <div className="relative shrink-0">
      <select
        value={selected ?? ''}
        onChange={(e) => onSelect(e.target.value || null)}
        className="h-[38px] pl-4 pr-8 text-sm md:text-base rounded-[980px] bg-white text-[var(--color-text)] border border-[var(--color-border)] outline-none cursor-pointer appearance-none transition-colors duration-200 hover:border-[#A1A1AA]"
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {formatOption ? formatOption(opt) : opt}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[var(--color-text-secondary)] pointer-events-none" />
    </div>
  )
}

function BrandChip({
  brand,
  isSelected,
  onClick,
}: {
  brand: string | null
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 shrink-0 px-4 py-1.5 rounded-[980px] text-sm md:text-base font-semibold transition-all duration-200 ease-apple ${
        isSelected
          ? 'bg-[#09090B] text-[#FAFAFA]'
          : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[#E4E4E7] active:scale-[0.97]'
      }`}
    >
      {brand && BRAND_LOGOS[brand.toLowerCase().trim()] && (
        <img
          src={BRAND_LOGOS[brand.toLowerCase().trim()]}
          alt=""
          className={`h-[16px] w-auto ${isSelected && brand.toLowerCase().trim() === 'apple' ? 'brightness-0 invert' : ''}`}
        />
      )}
      {brand ?? 'Todos'}
    </button>
  )
}

function BrandChips({
  brands,
  selectedBrand,
  onSelectBrand,
}: {
  brands: string[]
  selectedBrand: string | null
  onSelectBrand: (brand: string | null) => void
}) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
      <BrandChip brand={null} isSelected={selectedBrand === null} onClick={() => onSelectBrand(null)} />
      {brands.map((brand) => (
        <BrandChip key={brand} brand={brand} isSelected={selectedBrand === brand} onClick={() => onSelectBrand(brand)} />
      ))}
    </div>
  )
}

export default function FilterBar({
  brands,
  selectedBrand,
  onSelectBrand,
  searchQuery,
  onSearchChange,
  storages,
  selectedStorage,
  onSelectStorage,
  rams,
  selectedRam,
  onSelectRam,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)

  const activeFilterCount = (selectedStorage ? 1 : 0) + (selectedRam ? 1 : 0)

  return (
    <div className="px-5 lg:px-10 pb-8">
      {/* Mobile layout */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="relative w-full">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[var(--color-text-secondary)] pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-[38px] pl-9 pr-4 text-sm rounded-[980px] bg-[var(--color-bg-tertiary)] text-[var(--color-text)] placeholder:text-[var(--color-text-placeholder)] border border-[var(--color-border)] outline-none transition-all duration-200 hover:border-[#A1A1AA] focus:border-[#09090B] focus:border-2 focus:bg-white"
          />
        </div>

        <BrandChips brands={brands} selectedBrand={selectedBrand} onSelectBrand={onSelectBrand} />

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 w-full h-[38px] rounded-[980px] bg-[var(--color-bg-tertiary)] text-[var(--color-text)] border border-[var(--color-border)] text-sm font-semibold transition-all duration-200 hover:border-[#A1A1AA] active:scale-[0.97]"
        >
          <FunnelIcon className="w-[16px] h-[16px]" />
          Armazenamento / RAM
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#09090B] text-[#FAFAFA] text-[11px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
          <ChevronDownIcon className={`w-[14px] h-[14px] transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {showFilters && (
          <div className="flex gap-2 animate-slide-down">
            <div className="flex-1">
              <FilterDropdown label="Armazenamento" options={storages} selected={selectedStorage} onSelect={(v) => { onSelectStorage(v); setShowFilters(false) }} formatOption={(v) => /[GT]B$/i.test(v.replace(/\s/g, '')) ? v : `${v} GB`} />
            </div>
            <div className="flex-1">
              <FilterDropdown label="RAM" options={rams} selected={selectedRam} onSelect={(v) => { onSelectRam(v); setShowFilters(false) }} formatOption={(v) => `${v} GB`} />
            </div>
          </div>
        )}
      </div>

      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-5 items-center gap-2 min-w-0">
        <div className="col-start-2 flex justify-start">
          <BrandChips brands={brands} selectedBrand={selectedBrand} onSelectBrand={onSelectBrand} />
        </div>

        <div className="col-start-3 flex justify-end">
          <div className="flex items-center gap-1.5 shrink-0">
            <FilterDropdown label="Armazenamento" options={storages} selected={selectedStorage} onSelect={onSelectStorage} formatOption={(v) => /[GT]B$/i.test(v.replace(/\s/g, '')) ? v : `${v} GB`} />
            <FilterDropdown label="RAM" options={rams} selected={selectedRam} onSelect={onSelectRam} formatOption={(v) => `${v} GB`} />
          </div>
        </div>

        <div className="col-start-4 flex justify-end">
          <div className="relative shrink-0">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[var(--color-text-secondary)] pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-[220px] md:w-[320px] h-[38px] pl-9 pr-4 text-sm md:text-base rounded-[980px] bg-[var(--color-bg-tertiary)] text-[var(--color-text)] placeholder:text-[var(--color-text-placeholder)] border border-[var(--color-border)] outline-none transition-all duration-200 hover:border-[#A1A1AA] focus:border-[#09090B] focus:border-2 focus:bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
