interface VariantSelectorProps {
  label: string
  options: string[]
  selected: string
  onSelect: (value: string) => void
}

export default function VariantSelector({ label, options, selected, onSelect }: VariantSelectorProps) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-3 py-1.5 text-[12px] font-medium rounded-[8px] border transition-all ${
              selected === opt
                ? 'border-apple-blue bg-apple-blue/10 text-apple-blue'
                : 'border-[var(--color-separator)] text-[var(--color-text-secondary)] hover:border-apple-blue'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
