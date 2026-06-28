interface VariantSelectorProps {
  label: string
  options: string[]
  selected: string
  onSelect: (value: string) => void
  formatOption?: (value: string) => string
}

export default function VariantSelector({ label, options, selected, onSelect, formatOption }: VariantSelectorProps) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[var(--color-text-secondary)] mb-2.5">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-3 md:px-4 py-[6px] md:py-[7px] text-[12px] md:text-[13px] font-semibold rounded-[980px] transition-all duration-300 ease-apple active:scale-[0.97] ${
              selected === opt
                ? 'bg-[#09090B] text-white'
                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[#E4E4E7]'
            }`}
          >
            {formatOption ? formatOption(opt) : opt}
          </button>
        ))}
      </div>
    </div>
  )
}
