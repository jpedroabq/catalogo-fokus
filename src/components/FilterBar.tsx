import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { MagnifyingGlassIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
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
  sortOrder: string | null
  onSortChange: (order: string | null) => void
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
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)

  const updatePos = useCallback(() => {
    if (!btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    setPos({ top: r.bottom + 6, left: r.left, width: r.width })
  }, [])

  useEffect(() => {
    if (!open) return
    updatePos()
    window.addEventListener('scroll', updatePos, true)
    window.addEventListener('resize', updatePos)
    return () => {
      window.removeEventListener('scroll', updatePos, true)
      window.removeEventListener('resize', updatePos)
    }
  }, [open, updatePos])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        btnRef.current &&
        (btnRef.current === e.target || btnRef.current.contains(e.target as Node))
      ) return
      const portal = document.getElementById(`dropdown-menu-${label}`)
      if (portal && (portal === e.target || portal.contains(e.target as Node))) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, label])

  const displayText = selected
    ? formatOption
      ? formatOption(selected)
      : selected
    : label

  return (
    <div className="relative w-full md:w-[180px]">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex h-[38px] w-full items-center justify-center gap-1.5 rounded-[980px] border px-3 text-sm transition-all duration-200 md:text-base ${
          selected
            ? 'border-[#09090B] bg-[#09090B] text-[#FAFAFA]'
            : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[#A1A1AA] active:scale-[0.98]'
        }`}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDownIcon
          className={`h-[14px] w-[14px] shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          } ${
            selected ? 'text-[#FAFAFA]' : 'text-[var(--color-text-secondary)]'
          }`}
        />
      </button>

      {open && createPortal(
        <>
          <div className="fixed inset-0 z-[998]" onClick={() => setOpen(false)} />
          <div
            id={`dropdown-menu-${label}`}
            className="fixed z-[999] animate-slide-down rounded-[14px] border border-[var(--color-border)] bg-white p-1 shadow-lg"
            style={{ top: pos.top, left: pos.left, width: pos.width }}
          >
            <button
              type="button"
              onClick={() => { onSelect(null); setOpen(false) }}
              className={`flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-[#F4F4F5] ${
                !selected ? 'font-semibold text-[#09090B]' : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {label}
              {!selected && <CheckIcon className="h-[14px] w-[14px] text-[#09090B]" />}
            </button>
            {options.map((opt) => {
              const display = formatOption ? formatOption(opt) : opt
              const isSelected = selected === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { onSelect(opt); setOpen(false) }}
                  className={`flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-[#F4F4F5] ${
                    isSelected ? 'font-semibold text-[#09090B]' : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {display}
                  {isSelected && <CheckIcon className="h-[14px] w-[14px] text-[#09090B]" />}
                </button>
              )
            })}
          </div>
        </>,
        document.body
      )}
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
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
  sortOrder,
  onSortChange,
}: FilterBarProps) {
  return (
    <>
      <div className="sticky top-16 z-[60] border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 px-4 py-3 shadow-sm backdrop-blur md:hidden sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="relative w-full">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[var(--color-text-secondary)]" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-[40px] w-full rounded-[980px] border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] pl-9 pr-4 text-sm text-[var(--color-text)] outline-none transition-all duration-200 placeholder:text-[var(--color-text-placeholder)] hover:border-[#A1A1AA] focus:border-[#09090B] focus:border-2 focus:bg-white"
            />
          </div>

          <BrandChips brands={brands} selectedBrand={selectedBrand} onSelectBrand={onSelectBrand} />

          <div className="flex flex-wrap gap-2">
            <div className="min-w-[120px] flex-1">
              <FilterDropdown label="Armazenamento" options={storages} selected={selectedStorage} onSelect={onSelectStorage} formatOption={(v) => /[GT]B$/i.test(v.replace(/\s/g, '')) ? v : `${v} GB`} />
            </div>
            <div className="min-w-[120px] flex-1">
              <FilterDropdown label="RAM" options={rams} selected={selectedRam} onSelect={onSelectRam} formatOption={(v) => `${v} GB`} />
            </div>
            <div className="w-full sm:w-auto">
              <button
                onClick={() => onSortChange(sortOrder === 'price-asc' ? 'price-desc' : sortOrder === 'price-desc' ? null : 'price-asc')}
                className={`flex h-[40px] w-full items-center justify-center gap-1.5 rounded-[980px] border px-4 text-sm font-semibold transition-all duration-200 sm:w-auto ${
                  sortOrder
                    ? 'border-[#09090B] bg-[#09090B] text-[#FAFAFA]'
                    : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[#A1A1AA]'
                }`}
              >
                Preço
                {sortOrder === 'price-asc' ? <span>↑</span> : sortOrder === 'price-desc' ? <span className="inline-block rotate-180">↑</span> : <span className="text-[10px] leading-none">↑↓</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 p-3 shadow-sm backdrop-blur">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            <BrandChips brands={brands} selectedBrand={selectedBrand} onSelectBrand={onSelectBrand} />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown label="Armazenamento" options={storages} selected={selectedStorage} onSelect={onSelectStorage} formatOption={(v) => /[GT]B$/i.test(v.replace(/\s/g, '')) ? v : `${v} GB`} />
            <FilterDropdown label="RAM" options={rams} selected={selectedRam} onSelect={onSelectRam} formatOption={(v) => `${v} GB`} />
            <button
              onClick={() => onSortChange(sortOrder === 'price-asc' ? 'price-desc' : sortOrder === 'price-desc' ? null : 'price-asc')}
              className={`flex h-[38px] items-center gap-1.5 rounded-[980px] border px-4 text-sm font-semibold transition-all duration-200 ${
                sortOrder
                  ? 'border-[#09090B] bg-[#09090B] text-[#FAFAFA]'
                  : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[#A1A1AA]'
              }`}
            >
              {sortOrder === 'price-asc' ? <span>↑</span> : sortOrder === 'price-desc' ? <span>↓</span> : <span className="text-[10px] leading-none">↑↓</span>}
              Preço
            </button>
            <div className="relative w-full sm:w-[220px] lg:w-[260px]">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-[38px] w-full rounded-[980px] border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] pl-9 pr-4 text-sm text-[var(--color-text)] outline-none transition-all duration-200 placeholder:text-[var(--color-text-placeholder)] hover:border-[#A1A1AA] focus:border-[#09090B] focus:border-2 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

